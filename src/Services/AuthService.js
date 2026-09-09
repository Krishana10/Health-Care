import apiClient from '../API/apiClient';

// ==================== API CALLS ====================

// For Registering the user
export const RegisterUser = (registerData) => 
    apiClient.post('/api/auth/register', registerData);

// For Logging in the user
export const LoginUser = (loginData) => 
    apiClient.post('/api/auth/login', loginData);

// For Forgot Password
export const forgotPassword = (email) => 
    apiClient.post('/api/auth/forgot-password', { email });

// For Reset Password
export const resetPassword = (token, newPassword) => 
    apiClient.post('/api/auth/reset-password', { token, newPassword });

// ==================== TOKEN MANAGEMENT ====================

// Save JWT token to localStorage
export const saveToken = (token) => {
    localStorage.setItem('jwtToken', token);
    console.log('✅ Token saved to localStorage');
};

// Get JWT token from localStorage
export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

// Remove JWT token from localStorage (for logout)
export const removeToken = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    console.log('🗑️ Token removed from localStorage');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    
    try {
        // Check if token is expired
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000; // Convert to milliseconds
        const isValid = Date.now() < expiry;
        
        if (!isValid) {
            console.warn('⚠️ Token expired');
            removeToken();
        }
        
        return isValid;
    } catch (error) {
        console.error('❌ Error checking token validity:', error);
        return false;
    }
};

// ==================== USER ROLE MANAGEMENT ====================

// Decode JWT and get user role
export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Handle different JWT structures
        // Your backend might use 'authorities', 'roles', or 'role'
        const authorities = payload.authorities || payload.roles || payload.role;
        
        if (Array.isArray(authorities)) {
            return authorities[0]; // Return first role
        } else if (typeof authorities === 'string') {
            return authorities;
        }
        
        return null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Get user email from JWT
export const getUserEmail = () => {
    const token = getToken();
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || payload.email || payload.username;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Check if user has specific role
export const hasRole = (role) => {
    const userRole = getUserRole();
    if (!userRole) return false;
    return userRole.includes(role);
};

// ==================== AXIOS INTERCEPTORS ====================

let interceptorsSetup = false;
let isRedirecting = false; // Prevent multiple redirects

// Setup axios to automatically include JWT token in all requests
export const setupAxiosInterceptors = () => {
    if (interceptorsSetup) {
        console.log('⚙️ Interceptors already set up, skipping...');
        return;
    }

    console.log('⚙️ Setting up axios interceptors...');
    
    // Request interceptor - Add token to headers
    apiClient.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('🔐 Token added to request:', config.url);
            } else {
                console.warn('⚠️ No token found for request:', config.url);
            }
            return config;
        },
        (error) => {
            console.error('❌ Request interceptor error:', error);
            return Promise.reject(error);
        }
    );

    // Response interceptor - Handle 401/403 errors
    apiClient.interceptors.response.use(
        (response) => {
            // Check if backend sent a new token in response headers
            const newToken = response.headers['x-new-token'] || response.headers['authorization'];
            if (newToken) {
                const cleanToken = newToken.replace('Bearer ', '');
                saveToken(cleanToken);
                console.log('🔄 Token refreshed from backend');
            }
            return response;
        },
        (error) => {
            if (error.response) {
                const status = error.response.status;
                
                if (status === 401) {
                    console.error('❌ 401 Unauthorized - Token invalid or expired');
                    
                    // Prevent multiple simultaneous redirects
                    if (!isRedirecting) {
                        isRedirecting = true;
                        
                        // Clear token
                        removeToken();
                        
                        // Show user-friendly message
                        const message = error.response.data?.message || 
                                      'Your session has expired. Please login again.';
                        
                        // Store current path to redirect back after login
                        const currentPath = window.location.pathname;
                        if (currentPath !== '/login') {
                            sessionStorage.setItem('redirectAfterLogin', currentPath);
                        }
                        
                        // Show alert and redirect
                        setTimeout(() => {
                            console.log(message);
                            
                            window.location.href = '/login';
                        }, 100);
                        
                        // Reset redirect flag after 2 seconds
                        setTimeout(() => {
                            isRedirecting = false;
                        }, 2000);
                    }
                } else if (status === 403) {
                    console.error('❌ 403 Forbidden - Access denied');
                    console.error('Response:', error.response.data);
                    
                    // Don't redirect for 403, just show error
                    const message = error.response.data?.message || 
                                  'You do not have permission to access this resource.';
                    console.error(message);
                    
                }
            } else if (error.message === 'Token expired') {
                // This is from our request interceptor
                console.log('🔄 Token expired, already handling redirect');
            } else {
                console.error('❌ Network or other error:', error.message);
            }
            return Promise.reject(error);
        }
    );

    interceptorsSetup = true;
    console.log('✅ Axios interceptors set up successfully');
};

// Reset interceptors (useful for testing)
export const resetInterceptors = () => {
    interceptorsSetup = false;
    isRedirecting = false;
    apiClient.interceptors.request.clear();
    apiClient.interceptors.response.clear();
    console.log('🔄 Interceptors reset');
};

// ==================== NAVIGATION HELPERS ====================

// Get dashboard URL based on user role
export const getDashboardRoute = () => {
    const role = getUserRole();
    
    if (!role) return '/login';
    
    if (role.includes('ROLE_PATIENT') || role.includes('PATIENT')) {
        return '/patient';
    } else if (role.includes('ROLE_DOCTOR') || role.includes('DOCTOR')) {
        return '/doctor/dashboard';
    } else if (role.includes('ROLE_ADMIN') || role.includes('ADMIN')) {
        return '/admin/dashboard';
    }
    
    return '/dashboard'; // Default
};

// ==================== USER INFO ====================

// Get complete user info from token
export const getUserInfo = () => {
    const token = getToken();
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            email: payload.sub || payload.email || payload.username,
            role: getUserRole(),
            exp: payload.exp,
            iat: payload.iat,
            expiresIn: payload.exp ? (payload.exp * 1000 - Date.now()) / 1000 : null // seconds until expiry
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// ==================== TOKEN MONITORING ====================

// Check token expiry and warn user before it expires
export const startTokenExpiryMonitor = (callback) => {
    const checkInterval = setInterval(() => {
        const userInfo = getUserInfo();
        
        if (!userInfo) {
            clearInterval(checkInterval);
            return;
        }
        
        const expiresIn = userInfo.expiresIn;
        
        // Warn user 5 minutes before token expires
        if (expiresIn && expiresIn < 300 && expiresIn > 0) {
            console.warn('⚠️ Token expiring soon:', Math.floor(expiresIn), 'seconds');
            if (callback) {
                callback(Math.floor(expiresIn));
            }
        }
        
        // Token has expired
        if (expiresIn && expiresIn <= 0) {
            console.error('❌ Token has expired');
            clearInterval(checkInterval);
            if (!isRedirecting) {
                removeToken();
                window.location.href = '/login';
            }
        }
    }, 60000); // Check every minute
    
    return checkInterval;
};
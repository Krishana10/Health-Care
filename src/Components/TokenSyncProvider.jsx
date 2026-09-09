import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken, isAuthenticated } from '../Services/AuthService';

/**
 * TokenSyncProvider - Handles cross-tab authentication synchronization
 * Wrap your app with this component to sync logout/token changes across browser tabs
 */
const TokenSyncProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for storage changes from other tabs
        const handleStorageChange = (e) => {
            // Check if the token was removed in another tab
            if (e.key === 'jwtToken') {
                if (e.newValue === null) {
                    // Token was removed in another tab
                    console.log('🔄 Token removed in another tab, logging out...');
                    removeToken();
                    navigate('/login', { replace: true });
                } else if (e.oldValue !== e.newValue) {
                    // Token was updated in another tab
                    console.log('🔄 Token updated in another tab, reloading...');
                    window.location.reload();
                }
            }
        };

        // Add event listener
        window.addEventListener('storage', handleStorageChange);

        // Check token validity periodically (every 30 seconds)
        const tokenCheckInterval = setInterval(() => {
            if (!isAuthenticated()) {
                console.log('⚠️ Token expired, logging out...');
                removeToken();
                navigate('/login', { replace: true });
            }
        }, 30000); // 30 seconds

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(tokenCheckInterval);
        };
    }, [navigate]);

    return <>{children}</>;
};

export default TokenSyncProvider;
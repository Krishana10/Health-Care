import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUserRole, removeToken } from "../../Services/AuthService.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const authenticated = isAuthenticated();
    const userRole = getUserRole();

    // If not authenticated (no token or expired token), redirect to login
    if (!authenticated) {
        console.log('⚠️ User not authenticated, redirecting to login...');
        console.log('Current path:', location.pathname);
        
        // Clear any stale tokens
        removeToken();
        
        // Preserve the attempted location so we can redirect back after login
        return <Navigate 
            to="/login" 
            state={{ from: location.pathname }} 
            replace 
        />;
    }

    // If roles are specified and user doesn't have the required role
    if (allowedRoles && allowedRoles.length > 0) {
        const hasRole = allowedRoles.some(role =>
            userRole && userRole.includes(role)
        );

        if (!hasRole) {
            console.log('⚠️ User does not have required role');
            console.log('User role:', userRole);
            console.log('Required roles:', allowedRoles);
            
            return <Navigate to="/unauthorized" replace />;
        }
    }

    console.log('✅ Access granted to protected route:', location.pathname);
    return children;
};

export default ProtectedRoute;
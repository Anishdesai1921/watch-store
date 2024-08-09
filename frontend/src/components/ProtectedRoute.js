import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if the user is authenticated as admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAdmin) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the children (admin dashboard) if authenticated
    return children;
};

export default ProtectedRoute;

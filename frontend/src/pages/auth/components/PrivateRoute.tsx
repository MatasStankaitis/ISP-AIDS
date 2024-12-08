// frontend/src/components/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const authContext = useContext(AuthContext);

  if (authContext?.isLoading) {
    // Optionally, render a loading indicator here
    return null;
  }

  if (!authContext?.user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(authContext.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
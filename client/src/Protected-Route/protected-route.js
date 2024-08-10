import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();

  
  if (!isAuthenticated) {
    alert('Login to access');
    return <Navigate to="/home" />;
  }

  return element;
};

export default ProtectedRoute;

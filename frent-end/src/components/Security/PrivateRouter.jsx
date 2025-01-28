import { Navigate } from 'react-router';

const PrivateRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/login" replace />; // Redirect to login if not connected
  }
  return children;
};

export default PrivateRouter;
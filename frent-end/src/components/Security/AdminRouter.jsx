import { Navigate } from 'react-router';

const AdminRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/login" replace />; // Redirect to login if not connected
  } else if (user.role !== 'ADMIN') {
    return <Navigate to="/notaccess" replace />; // Redirect to /notaccess if not an admin
  }
  return children;
};

export default AdminRouter;
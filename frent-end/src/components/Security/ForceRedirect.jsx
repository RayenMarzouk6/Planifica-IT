const ForceRedirect = ({ user, children }) => {
    if (user.isConnected) {
      if (user.role === 'ADMIN') {
        return <Navigate to="/" />;
      } else if (user.role === 'EMPLOYE') {
        return <Navigate to="/user-dashboard" />;
      }
    }
  
    return children;
  };
  
  export default ForceRedirect;
  
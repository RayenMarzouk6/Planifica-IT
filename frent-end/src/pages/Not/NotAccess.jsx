import { Box, Typography, Button } from '@mui/material'; // Import MUI components
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NotAccess = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Full viewport height
        backgroundColor: '#f0f0f0', // Light background color
        padding: '20px',
      }}
    >
      <img
        src="Auth/noAccess.gif"
        alt="No Access"
        className="w-64 h-64 mb-8 rounded-lg shadow-lg" // Tailwind CSS for image size, margin, and styling
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 'bold',
          color: '#333', // Dark text color
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        Access Denied
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          color: '#666', // Lighter text color
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        You don't have permission to access this page. Please contact the administrator for assistance.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/login')} // Corrected: Pass a function to onClick
        sx={{
          fontWeight: 'bold',
          textTransform: 'none', // Disable uppercase transformation
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotAccess;
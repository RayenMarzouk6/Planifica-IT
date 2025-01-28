
import { Box, Typography } from '@mui/material'; // Import MUI components

const NotFound = () => {
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
      <img  src="Auth/logo.png" alt="logo" className="absolute top-0 left-0 w-28 m-5"/>
      <img
        src="Auth/not-found.png"
        alt="Not Found"
        className="h-64 mb-8"
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
        404 - Page Not Found
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          color: '#666', // Lighter text color
          textAlign: 'center',
        }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
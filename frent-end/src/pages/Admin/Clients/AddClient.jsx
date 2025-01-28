import { useState } from "react";
import {
  Box,
  TextField,
  Button,

  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

const AddClient = () => {
  const [clientData, setClientData] = useState({
    client_name: "",
    email: "",
    phone: "",
    adresse: "",
    company_name: "",
    company_logo: null, // For file upload
  });

  // const [projects, setProjects] = useState([]); 
  const [selectedProjects, setSelectedProjects] = useState([]); // Selected projects

  // Fetch projects from the database
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3010/project/projects") // Replace with your actual endpoint for fetching projects
  //     .then((response) => {
  //       setProjects(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching projects:", error);
  //     });
  // }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setClientData({ ...clientData, company_logo: e.target.files[0] });
  };

  // Handle project selection
  // const handleProjectChange = (e) => {
  //   setSelectedProjects(e.target.value);
  // };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Form data to send (including the file)
    const formData = new FormData();
    formData.append("client_name", clientData.client_name);
    formData.append("email", clientData.email);
    formData.append("phone", clientData.phone);
    formData.append("adresse", clientData.adresse);
    formData.append("company_name", clientData.company_name);
    formData.append("company_logo", clientData.company_logo);
    selectedProjects.forEach((project) => formData.append("projects", project));
  
    // Debug: Log the form data
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    axios
      .post("http://localhost:3010/client/addClient", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Client added successfully:", response.data);
        alertify.success('Client added successfully');
        // Reset the form
        setClientData({
          client_name: "",
          email: "",
          phone: "",
          adresse: "",
          company_name: "",
          company_logo: null,
        });
        setSelectedProjects([]);
      })
      .catch((error) => {
        console.error("Error adding client:", error.response?.data || error.message);
        alertify.error(error.message);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        marginY : "50px"
        
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add New Client
      </Typography>
      <Grid container spacing={3}>
        {/* Client Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            name="client_name"
            label="Client Name"
            value={clientData.client_name}
            onChange={handleChange}
            required
          />
        </Grid>
        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            name="email"
            label="Email"
            type="email"
            value={clientData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            name="phone"
            label="Phone"
            value={clientData.phone}
            onChange={handleChange}
            required
          />
        </Grid>
        {/* Address */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            name="adresse"
            label="Address"
            value={clientData.adresse}
            onChange={handleChange}
            required
          />
        </Grid>
        {/* Company Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            name="company_name"
            label="Company Name"
            value={clientData.company_name}
            onChange={handleChange}
            required
          />
        </Grid>
        {/* Upload File */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Upload Company Logo
            <input
              type="file"
              name="company_logo"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {clientData.company_logo && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1 }}
            >
              Selected File: {clientData.company_logo.name}
            </Typography>
          )}
        </Grid>
        {/* Projects Dropdown */}
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            select
            variant="outlined"
            label="Select Projects"
            value={selectedProjects}
            onChange={handleProjectChange}
            SelectProps={{
              multiple: true,
            }}
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name_project}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}
        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Client
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddClient;

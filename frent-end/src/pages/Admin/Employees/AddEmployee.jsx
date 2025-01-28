import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { useState } from "react";
  
  import alertify from "alertifyjs";
  import "alertifyjs/build/css/alertify.css";
  import "alertifyjs/build/css/themes/default.css";
  
  const AddEmployee = () => {
    const [employee, setEmployee] = useState({
      name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      image: null,
    });
  
    // Handle file input change
    const handleFileChange = (e) => {
      setEmployee({ ...employee, image: e.target.files[0] });
    };
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee({ ...employee, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formEmploye = new FormData();
      formEmploye.append("name", employee.name);
      formEmploye.append("email", employee.email);
      formEmploye.append("phone", employee.phone);
      formEmploye.append("role", employee.role);
      formEmploye.append("password", employee.password);
      formEmploye.append("image", employee.image);
  
      axios
        .post("http://localhost:3010/user/addUser", formEmploye, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Employee added successfully:", response.data);
          alertify.success("Employee added successfully");
          setEmployee({
            name: "",
            email: "",
            phone: "",
            role: "",
            password: "",
            image: null,
          });
        })
        .catch((error) => {
          console.error(
            "Error adding employee:",
            error.response?.data || error.message
          );
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
          maxWidth: "600px",
          margin: "0 auto",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          marginY: "50px",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add New Employee
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="name"
          label="Name"
          value={employee.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="email"
          variant="outlined"
          name="email"
          label="Email"
          value={employee.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          name="phone"
          label="Phone"
          value={employee.phone}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          name="password"
          label="Password"
          type="password"
          value={employee.password}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          select
          variant="outlined"
          name="role"
          label="Role"
          value={employee.role}
          onChange={handleChange}
          defaultValue={"EMPLOYE"}
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="EMPLOYE">Employe</MenuItem>
        </TextField>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Upload Profile Picture
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {employee.image && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1 }}
            >
              Selected File: {employee.image.name}
            </Typography>
          )}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ textTransform: "none", mt: 2 }}
        >
          Add Employee
        </Button>
      </Box>
    );
  };
  
  export default AddEmployee;
  
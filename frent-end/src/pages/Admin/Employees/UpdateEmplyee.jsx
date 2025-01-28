import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";

const UpdateEmplyee = () => {
  const { employeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  // Fetch employee details by ID
  useEffect(() => {
    const fetchEmployeeById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3010/user/getbyid/${employeId}`);

        if (response.status === 200) {
          const data = response.data;
          console.log("Fetched data:", data);

          setEmployeeData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            role: data.role || "",
            password: "",
            image: data.image || "",
          });

          setImagePreview(`http://localhost:3010/${data.image}`);
        } else {
          alertify.error("Unexpected response status.");
        }
      } catch (err) {
        console.error(err);
        alertify.error("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeById();
  }, [employeId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(employeeData).forEach((key) => {
        formData.append(key, employeeData[key]);
      });

      const token = localStorage.getItem("jwt");
      const response = await axios.put(
        `http://localhost:3010/user/updateProfile/${employeId}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alertify.success("Employee updated successfully!");
        navigate("/admin/employe");
      } else {
        alertify.error("Failed to update employee.");
      }
    } catch (err) {
      console.error(err);
      alertify.error("Failed to update employee.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        mt: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Update Employee
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="name"
        label="Name"
        value={employeeData.name}
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
        value={employeeData.email}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        name="phone"
        label="Phone"
        value={employeeData.phone}
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
        value={employeeData.password}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        select
        variant="outlined"
        name="role"
        label="Role"
        value={employeeData.role}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      >
        <MenuItem value="ADMIN">Admin</MenuItem>
        <MenuItem value="EMPLOYEE">Employee</MenuItem>
      </TextField>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Button variant="contained" component="label" fullWidth>
            Upload Profile Picture
            <input type="file" name="image" accept="image/*" hidden onChange={handleFileChange} />
          </Button>
        </Grid>
        {imagePreview && (
          <Grid item xs={12}>
            <img src={imagePreview} alt="Profile Preview" style={{ width: "100%", borderRadius: "8px" }} />
          </Grid>
        )}
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ textTransform: "none", mt: 2 }}
      >
        Update Employee
      </Button>
    </Box>
  );
};

export default UpdateEmplyee;
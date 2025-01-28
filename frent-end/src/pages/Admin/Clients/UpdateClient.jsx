import  { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Input,
} from "@mui/material";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateClient = ({ fetchClients }) => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adresse: "",
    company_name: "",
  });
  const [companyLogo, setCompanyLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch client details on component mount
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3010/client/getClient/${clientId}`
        );
        console.log("Client data fetched:", response.data); 
        setFormData({
          name: response.data.client_name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          adresse: response.data.adresse || "",
          company_name: response.data.company_name || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Failed to fetch client details. Please try again later.");
        alertify.message("Failed to fetch client details. Please try again later.");
      }
    };

    fetchClientDetails();
  }, [clientId]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo file input change
  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("client_name", formData.name);
      form.append("adresse", formData.adresse); 
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("company_name", formData.company_name);
      if (companyLogo) form.append("company_logo", companyLogo);

      setLoading(true);
      await axios.put(
        `http://localhost:3010/client/updateClient/${clientId}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alertify.success("Client updated successfully!");
      setLoading(false);
      if (fetchClients) fetchClients(); // Refresh client list if function is passed
      navigate("/admin/client"); // Redirect back to client page
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Failed to update client. Please try again.");
      alertify.error("Failed to update client. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Update Client Details
      </Typography>

      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          type="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          type="tel"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          name="adresse" 
          value={formData.adresse || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company Name"
          name="company_name"
          value={formData.company_name || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box mt={2}>
          <Typography variant="body2" gutterBottom>
            Company Logo (optional):
          </Typography>
          <Input
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
          />
        </Box>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/client")}
          >
            Cancel
          </Button>

          <Button type="submit" variant="contained" color="primary">
            Update Client
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateClient;

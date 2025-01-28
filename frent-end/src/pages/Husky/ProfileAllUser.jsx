import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Install this using `npm install jwt-decode`
import { useEffect, useState } from "react";
import { Button, TextField, Card, CardContent, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const ProfileAllUser = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        console.error("No token found");
        return;
      }

      // Decode JWT to extract role
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role || "USER"; // Default to "USER" if role is not present

      const response = await axios.get(`http://localhost:3010/user/singleProfile`, {
        headers: {
          Authorization: token,
        },
      });

      // Merge role from token with API response data
      setProfile({ ...response.data, role: userRole });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Récupérez le token JWT
  
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("password", profile.password);
      if (file) formData.append("image", file);
  
      const response = await axios.put(
        `http://localhost:3010/user/updateProfile/${profile._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token, // Ajoutez le token JWT ici
          },
        }
      );
  
      setProfile(response.data.user);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <StyledCard>
      <CardContent className="flex flex-col items-center">
        {profile.image && (
          <Avatar
            src={`http://localhost:3010/uploads/user/${profile.image}`}
            alt="Profile"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
        )}

        <Typography variant="h5" gutterBottom>
        {profile.role === "ADMIN" 
            ? "Hello Admin!" 
            : profile.role === "EMPLOYE" 
            ? "Hello Employe!" 
            : "Hello!"}
        </Typography>


        {!isEditing ? (
          <div className="w-full space-y-4">
            <Typography>Name: {profile.name}</Typography>
            <Typography>Email: {profile.email}</Typography>
            <Typography>Phone: {profile.phone}</Typography>
            <Typography>Role: {profile.role}</Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setIsEditing(true)}
            >
              Update Profile
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile();
            }}
            className="w-full space-y-4"
          >
            <TextField
              fullWidth
              label="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Profile Image
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </form>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProfileAllUser;

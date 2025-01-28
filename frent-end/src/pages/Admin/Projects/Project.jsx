import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, AvatarGroup } from "@mui/material";
import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from "react-router-dom";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

const Project = () => {
  const [projects, setProjects] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();

  const deleteProject = (id, name) => {
    try {
      alertify.confirm(
        `You want to delete ${name} Project?`,
        async function () {
          await axios.delete(`http://localhost:3010/project/deleteProject/${id}`);
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project._id !== id)
          );
          alertify.success(`${name} Project Deleted`);
          navigate("/admin/project"); // Navigate back to the project list
        },
        function () {
          alertify.error("Delete Cancel");
        }
      );
    } catch (err) {
      alertify.message('Error message : ' + err);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.get("http://localhost:3010/project/getAllProjects", {
        headers: {
          Authorization: token,
        },
      });

      setProjects(response.data); // Ensure you're setting the correct data
    } catch (err) {
      console.error("Error fetching projects: ", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Box sx={{ textAlign: "right", py: 2 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#4C585B" }}
          onClick={() => navigate("/admin/addproject")}
        >
          <Add />
          Add Project
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell align="center">Budget</TableCell>
              <TableCell align="center">Team</TableCell>
              <TableCell align="center">Start Day</TableCell>
              <TableCell align="center">End Day</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img
                      src={item.logo ? `http://localhost:3010${item.logo}` : '/default_logo.avif'}
                      alt="Project Logo"
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell>{item.name_project}</TableCell>
                  <TableCell align="center">{item.budget.$numberDecimal}</TableCell>
                  <TableCell align="center">
                    <AvatarGroup max={3}>
                      {item.assigned_users && item.assigned_users.length > 0 ? (
                        item.assigned_users.map((user) => (
                          <Avatar
                            key={user._id}
                            src={`http://localhost:3010/${user.image}`}
                            alt={user.name}
                          />
                        ))
                      ) : (
                        <Avatar>N/A</Avatar> // Afficher un avatar par défaut si aucun utilisateur n'est assigné
                      )}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">{new Date(item.start_day).toISOString().split('T')[0]}</TableCell>
                  <TableCell align="center">{new Date(item.end_day).toISOString().split('T')[0]}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => navigate(`/admin/updateproject/${item._id}`)}
                    >
                      <EditOutlined sx={{ color: "orange" }} />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => deleteProject(item._id, item.name_project)}
                    >
                      <DeleteOutline />
                    </IconButton>
                    <IconButton
                      aria-label="view"
                      onClick={() => navigate(`/admin/projectDetails`, { state: { project: item } })}
                    >
                      <RemoveRedEyeIcon sx={{ color: '#4C585B' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Project;
import { InfoOutlined } from "@mui/icons-material";
import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Stack, Typography } from "@mui/material";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure the correct import
import { useEffect, useState } from "react";

const UserAssignedProject = () => {
    const [projectData, setProjectData] = useState([]);

    const getProjectData = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error("No JWT token found in local storage");
                return;
            }

            const decoded = jwtDecode(token);
            const userId = decoded._id; // Ensure this matches your JWT payload structure

            const res = await axios.get('http://localhost:3010/project/getAllProjects');
            if (res && res.data) {
                // Filter projects assigned to the current user
                const assignedProjects = res.data.filter(project => 
                    project.assigned_users.some(user => user._id === userId)
                );
                setProjectData(assignedProjects);
            } else {
                console.error("No projects found");
            }
        } catch (err) {
            console.error("Error fetching project data:", err);
        }
    };

    useEffect(() => {
        getProjectData();
    }, []);

    return (
        <Stack mb={2} className="flex justify-center items-center">
            <Typography variant="h5" fontWeight="bold" className="py-6">
                My Projects
            </Typography>

            <ImageList sx={{ width: "100vh", height: 580 }}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">Projects</ListSubheader>
                </ImageListItem>
                {projectData.length > 0 ? (
                    projectData.map((project) => (
                        <ImageListItem key={project._id}>
                            <img
                                src={project.logo ? `http://localhost:3010${project.logo}` : '/default_logo.avif'}
                                alt={project.name_project}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={project.name_project}
                                subtitle={
                                    <>
                                        <Typography variant="body2">{project.description}</Typography>
                                        <Typography variant="body2">Start Date: {new Date(project.start_day).toLocaleDateString()}</Typography>
                                        <Typography variant="body2">End Date: {new Date(project.end_day).toLocaleDateString()}</Typography>
                                    </>
                                }
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${project.name_project}`}
                                    >
                                        <InfoOutlined />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))
                ) : (
                    <Typography>No Projects Assigned</Typography>
                )}
            </ImageList>
        </Stack>
    );
};

export default UserAssignedProject;

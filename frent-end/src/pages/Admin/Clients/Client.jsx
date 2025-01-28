import { DeleteOutline, EditOutlined, Fingerprint } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


const Client = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [currentClientId, setCurrentClientId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch all clients
  const fetchClient = () => {
    axios
      .get('http://localhost:3010/client/getAllClients')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  };

  // Fetch all projects
  const fetchProjects = () => {
    axios
      .get('http://localhost:3010/project/getAllProjects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  };

  // Add a project to a client
  const handleAddProject = async () => {
    if (!selectedProject) {
      alertify.error('Please select a project.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:3010/client/addProjectToClient/${currentClientId}`,
        { projectId: selectedProject }
      );
      alertify.success('Project added successfully.');
      setOpenDialog(false);
      fetchClient();
    } catch (error) {
      console.error('Error adding project to client:', error);
      alertify.error('Failed to add project to client.');
    }
  };

  // Open the dialog to add a project
  const openAddProjectDialog = (clientId) => {
    setCurrentClientId(clientId);
    setOpenDialog(true);
  };

  // Delete a client
  const deleteClient = (id, name) => {
    alertify.confirm(
      `Are you sure you want to delete Client: ${name}?`,
      async function () {
        try {
          await axios.delete(`http://localhost:3010/client/deleteClient/${id}`);
          alertify.success(`Client "${name}" deleted successfully.`);
          fetchClient();
        } catch (error) {
          console.error('Error deleting client:', error);
          alertify.error('Failed to delete client.');
        }
      },
      function () {
        alertify.error('Delete action canceled.');
      }
    );
  };

  useEffect(() => {
    fetchClient();
    fetchProjects();
  }, []);

  return (
    <>
      <Box sx={{ textAlign: 'right', py: 2 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#4C585B' }}
          onClick={() => navigate('/admin/addClient')}
        >
          <AddIcon />
          Create Client
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>Logo Company</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client._id}>
                <TableCell component="th" scope="row">
                  <img
                    src={
                      client.company_logo
                        ? `http://localhost:3010/${client.company_logo}`
                        : './default_logo.avif'
                    }
                    alt={`${client.client_name} logo`}
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                  />
                </TableCell>
                <TableCell>{client.client_name}</TableCell>
                <TableCell align="center">{client.email}</TableCell>
                <TableCell align="center">{client.phone}</TableCell>
                <TableCell align="center">{client.adresse}</TableCell>
                <TableCell align="center">{client.company_name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="add-project"
                    color="success"
                    onClick={() => openAddProjectDialog(client._id)}
                  >
                    <Fingerprint />
                  </IconButton>

                  <IconButton
                    aria-label="edit-client"
                    onClick={() => navigate(`/admin/updateClient/${client._id}`)}
                  >
                    <EditOutlined sx={{ color: 'orange' }} />
                  </IconButton>

                  <IconButton
                    aria-label="delete-client"
                    color="error"
                    onClick={() => deleteClient(client._id, client.client_name)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Project Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Project to Client</DialogTitle>
        <DialogContent>
          <Select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="" disabled>
              Select a Project
            </MenuItem>
            {projects.length > 0 ? (
              projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.name_project}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                No projects available
              </MenuItem>
            )}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddProject}
            color="primary"
            disabled={!selectedProject}
          >
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Client;

import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProjectDetails = () => {
  const location = useLocation();
  const { project } = location.state || {};

  if (!project) {
    return <Typography variant="h6" align="center">No project data found.</Typography>;
  }

  const {
    name_project,
    logo,
    description,
    budget,
    start_day,
    end_day,
    document,
    assigned_users: team,
    client,
  } = project;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add Project Title and Logo
    if (logo) {
      const img = new Image();
      img.src = `http://localhost:3010${logo}`;
      doc.addImage(img, "JPEG", 15, 10, 30, 30);
    }
    doc.setFontSize(16);
    doc.text(name_project, 15, 50);

    // Add Description
    doc.setFontSize(12);
    doc.text("Project Details:", 15, 60);
    doc.text(description, 15, 70);

    // Add Info Table
    doc.autoTable({
      head: [["Budget", "Start Day", "End Day"]],
      body: [[
        `$${budget.$numberDecimal}`,
        new Date(start_day).toLocaleDateString(),
        new Date(end_day).toLocaleDateString()
      ]],
      startY: 80,
    });

    // Add Team Members
    if (team.length) {
      doc.text("Team Members:", 15, doc.previousAutoTable.finalY + 10);
      const teamData = team.map(member => [member.name, member.role || "Team Member"]);
      doc.autoTable({
        head: [["Name", "Role"]],
        body: teamData,
        startY: doc.previousAutoTable.finalY + 15,
      });
    }

    // Add Client Info
    doc.text("Client Information:", 15, doc.previousAutoTable.finalY + 10);
    doc.autoTable({
      head: [["Name", "Email", "Phone", "Address", "Company"]],
      body: [[
        client.client_name,
        client.email,
        client.phone,
        client.adresse,
        client.company_name,
      ]],
      startY: doc.previousAutoTable.finalY + 15,
    });

    doc.save(`${name_project}_details.pdf`);
  };

  const handleDownloadDocument = () => {
    if (document) {
      const fileUrl = `http://localhost:3010${document}`;
      console.log("Downloading from:", fileUrl);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = document.split("/").pop(); // Extract filename
      link.click();
    }
  };
  

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Card sx={{ p: 4, borderRadius: 2 }}>
        {/* Project Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
          <Avatar
            alt={name_project}
            src={logo ? `http://localhost:3010${logo}` : "/default_logo.avif"}
            sx={{ width: 110, height: 110 }}
          />
          <Typography variant="h3">{name_project}</Typography>
        </Box>

        {/* Project Description */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Project Details:
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>

        {/* Project Info (Budget, Start Day, End Day) */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                <AttachMoneyIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Budget
              </Typography>
              <Typography variant="h6">${budget.$numberDecimal}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                <EditCalendarIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Start Day
              </Typography>
              <Typography variant="h6">
                {new Date(start_day).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                <EventRepeatIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                End Day
              </Typography>
              <Typography variant="h6">
                {new Date(end_day).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Team Members */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            <PeopleIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Team Members
          </Typography>
          <List>
            {team.map((member, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  secondary={member.role || "Team Member"}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Client Info */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Client Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Name:</strong> {client.client_name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {client.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {client.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Address:</strong> {client.adresse}
              </Typography>
              <Typography variant="body1">
                <strong>Company:</strong> {client.company_name}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Attached Files */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            <FolderIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Attached Files
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Project Document"
                secondary={document ? `http://localhost:3010${document}` : "No document attached"}
              />
              {document && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownloadDocument}
                >
                  Download Document
                </Button>
              )}
            </ListItem>
          </List>
        </Box>

        {/* Buttons for PDF and Document */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownloadPDF}
          >
            Download Details as PDF
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProjectDetails;

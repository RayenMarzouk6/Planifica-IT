import { Box, Paper, Stack, Typography } from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Boxplot from "./Boxplot";

const UserHomeDashboard = () => {
  const stats = [
    { title: "Tasks Completed", value: "34", icon: <TaskAltIcon /> },
    { title: "Projects Participated", value: "12", icon: <MonetizationOnIcon /> },
    { title: "Team Members", value: "8", icon: <PeopleAltIcon /> },
  ];

  return (
    <Box className="pt-6">
      {/* Stats Section */}
      <Stack direction="row" spacing={2} mb={4} justifyContent="space-between">
        {stats.map((stat, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              flex: 1,
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#E8F0F2",
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {stat.title}
              </Typography>
              <Typography variant="h4" color="primary">
                {stat.value}
              </Typography>
            </Box>
            <Box fontSize="3rem" color="secondary.main">
              {stat.icon}
            </Box>
          </Paper>
        ))}
      </Stack>

      {/* Graph Section */}
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Weekly Progress
        </Typography>
        <Boxplot />
      </Paper>
    </Box>
  );
};

export default UserHomeDashboard;

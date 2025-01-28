import { DownloadOutlined } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import LineGraphe from "./LineGraphe";

const Row2 = () => {
  return (
    <Stack direction={"column"} mt={1.3} maxHeight={"100vh"} className="min-w-96">
      <Paper sx={{ minWidth: "100vh", flexGrow: 1 }}>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography mb={1} mt={2} ml={4} variant="h6" fontWeight={"bold"}>
              Revenue Generated
            </Typography>
            <Typography variant="body2" ml={4}>
              $59,342.32
            </Typography>
          </Box>

          <Box>
            <IconButton sx={{ mr: 3 }}>
              <DownloadOutlined />
            </IconButton>
          </Box>
        </Stack>

        {/* Ajouter un ID au graphique */}
        <div id="line-graph">
          <LineGraphe />
        </div>
      </Paper>

      <Box
        sx={{
          overflow: "auto",
          borderRadius: "4px",
          minWidth: "280px",
          maxHeight: 355,
          flexGrow: 1,
        }}
      ></Box>
    </Stack>
  );
};

export default Row2;
import BadgeIcon from '@mui/icons-material/Badge';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import LaptopIcon from '@mui/icons-material/Laptop';
  // import { Stack, useTheme } from "@mui/material";
  import { data1, data2, data3, data4 } from "./data";
import Card from "./Card";
import { Stack } from "@mui/material";
  
  const Row1 = () => {
    // const theme = useTheme();
    return (
      <Stack
        direction={"row"}
        gap={"6px"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Card
          icon={
            <MonetizationOnIcon
              // sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          value={"431,225"}
          title={"Sales obtained"}
          data={data1}
          persentage={"+21%"}
        />
        <Card
          icon={
            <BadgeIcon
              // sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          value={"12"}
          title={"New Clinets"}
          data={data2}
          persentage={"+5%"}
        />
        <Card
          icon={
            <BeenhereIcon
              // sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          value={"12,361"}
          title={"Project Completed"}
          data={data3}
          persentage={"+43%"}
        />
        <Card
          icon={
            <LaptopIcon
              // sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
            />
          }
          value={"12,361"}
          title={"Employees Number"}
          data={data4}
          persentage={"+14%"}
        />
      </Stack>
    );
  };
  
  export default Row1;
  
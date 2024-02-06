import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddchartIcon from "@mui/icons-material/Addchart";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import SatelliteIcon from "@mui/icons-material/Satellite";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip
} from "@mui/material";
import React from "react";

const menuListArray: { title: string; icon: any }[] = [
  {
    title: "شاخص",

    icon: <AddchartIcon color="secondary" sx={{ fontSize: "28px" }} />,
  },
  {
    title: "پیام ها",
    icon: <NotificationsIcon color="secondary" sx={{ fontSize: "28px" }} />,
  },
  {
    title: "وضعیت مالی مشتری",
    icon: <PaidIcon color="secondary" sx={{ fontSize: "28px" }} />,
  },
  {
    title: "جزعیات نماد",
    icon: <AccountTreeIcon color="secondary" sx={{ fontSize: "28px" }} />,
  },
  {
    title: "باشگاه",
    icon: <SatelliteIcon color="secondary" sx={{ fontSize: "28px" }} />,
  },
  {
    title: "صندوق",
    icon: (
      <AccountBalanceSharpIcon color="secondary" sx={{ fontSize: "28px" }} />
    ),
  },
  {
    title: "ثبت تیکت پشتیبانی",
    icon: (
      <ConfirmationNumberIcon color="secondary" sx={{ fontSize: "28px" }} />
    ),
  },
  {
    title: "اطلاعیه های کدال",
    icon: <InfoIcon color="secondary" sx={{ fontSize: "28px" }} />,
  },
  {
    title: "agah TV",
    icon: <DonutSmallIcon color="secondary" sx={{ fontSize: "28px" }} />,
  },
];

const DashbordVerticalList = () => {
  return (
    <Box className="bg-[#46566E] dark:bg-[#243740]">
      <nav>
        <List sx={{padding:"0"}}>
          {menuListArray.map((item) => (
            <React.Fragment key={item.title}>
              <ListItem disablePadding>
                <ListItemButton >
                  <ListItemIcon sx={{ minWidth: "0" }}>
                    <Tooltip title={item.title} placement="right" arrow>
                      {item.icon}
                    </Tooltip>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider
                variant="fullWidth"
                sx={{ bgcolor: "#577a90" }}
                component="aside"
              />
            </React.Fragment>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default DashbordVerticalList;

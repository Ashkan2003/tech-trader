"use client";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AddchartIcon from "@mui/icons-material/Addchart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SatelliteIcon from "@mui/icons-material/Satellite";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import InfoIcon from "@mui/icons-material/Info";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

const menuListArray: { title: string; icon: any }[] = [
  {
    title: "شاخص",
    icon: <AddchartIcon fontSize="medium" sx={{ color: "#D8E4F0" }} />,
  },
  {
    title: "پیام ها",
    icon: <NotificationsIcon fontSize="medium" sx={{ color: "#677790" }} />,
  },
  {
    title: "وضعیت مالی مشتری",
    icon: <PaidIcon fontSize="medium" sx={{ color: "#677790" }} />,
  },
  {
    title: "جزعیات نماد",
    icon: <AccountTreeIcon fontSize="medium" sx={{ color: "#677790" }} />,
  },
  {
    title: "باشگاه",
    icon: <SatelliteIcon fontSize="medium" sx={{ color: "#677790" }} />,
  },
  {
    title: "صندوق",
    icon: (
      <AccountBalanceSharpIcon fontSize="medium" sx={{ color: "#677790" }} />
    ),
  },
  {
    title: "ثبت تیکت پشتیبانی",
    icon: <ConfirmationNumberIcon fontSize="medium" sx={{ color: "#677790" }} />,
  },
  {
    title: "اطلاعیه های کدال",
    icon: <InfoIcon fontSize="medium" sx={{ color: "#677790" }} />,
  },
  {
    title: "agah TV",
    icon: <DonutSmallIcon fontSize="medium" sx={{ color: "#677790" }} />,
  },
];

const DashbordVerticalList = () => {
  return (
    <Box className="bg-[#46566E]">
      <nav>
        <List>
          {menuListArray.map((item) => (
            <React.Fragment key={item.title}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: "0" }}>
                    <Tooltip title={item.title} placement="right" arrow>
                      {item.icon}
                    </Tooltip>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider sx={{bgcolor:"#7f858a"}}  component="li" />
            </React.Fragment>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default DashbordVerticalList;

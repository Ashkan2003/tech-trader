"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Typography } from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";
type Anchor = "top" | "left" | "bottom" | "right";

const menuListArray: { title: string; icon: any }[] = [
  {
    title: "دیده بان کلاسیک",
    icon: <GridOnIcon fontSize="small" sx={{ color: "#CCEA8E" }} />,
  },
  {title:"دیده بان تکنیکال" , icon:<GridOnIcon fontSize="small" sx={{ color: "#CCEA8E" }} />},
  {title:"نقشه بازار" , icon:<GridOnIcon fontSize="small" sx={{ color: "#CCEA8E" }} />},
  {title:"اوراق بدهی" , icon:<GridOnIcon fontSize="small" sx={{ color: "#CCEA8E" }} />},
  {title:"پیام ها" , icon:<GridOnIcon fontSize="small" sx={{ color: "#CCEA8E" }} />},
];

export default function Menu() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      color="white"
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography color="#CCEA8E">دیده بان بازار</Typography>
      <Divider variant="middle" sx={{ bgcolor: "#CCEA8E" }} />

      <List>
        {menuListArray.map((item) => (
          <ListItem key={item.title} sx={{ padding: 0 }} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "30px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" sx={{ bgcolor: "#CCEA8E" }} />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ padding: 0 }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            onClick={toggleDrawer(anchor, true)}
            color="secondary"
            aria-label="add an alarm"
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>

          <Drawer
            PaperProps={{
              sx: { bgcolor: "#46566E" },
            }}
            BackdropProps={{ invisible: true }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

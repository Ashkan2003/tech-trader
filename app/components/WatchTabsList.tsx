import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
export default function WatchTabsList() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <List component="nav">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="سهام اصلی" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
    </Box>
  );
}

"use client";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { useState } from "react";

const TechWatchTabList = () => {
  const watchList: { id: number; title: string; symbols: string[] }[] = [
    { id: 1, title: "سهام اصلی", symbols: [] },
    { id: 2, title: "سهام ایبیی", symbols: [] },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1); // the current selected watch from the list

  // this function is for activating the selected watch by adding some style
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      {/* the list */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          color: "textPallet.main",
          bgcolor: "ternery.dark",
        }}
      >
        <List component="nav">
          {watchList.map((item, index) => (
            <div
              className={`flex ${
                selectedIndex === index && "bg-[#e6e8ea] dark:bg-[#212121]"
              }`}
              key={item.id}
            >
              <ListItemButton
                // selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemIcon>
                  <AccountTreeIcon color="info" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
              <div className="flex"></div>
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default TechWatchTabList;

"use client";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useState } from "react";

export default function WatchTabsList() {
  const watchList: { title: string }[] = [
    { title: "سهام اصلی" },
    { title: "سهام ایبیی" },
  ];
  const [watchListArray, setWatchListArray] = useState(watchList);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleInputClick = (inputValue: string) => {
    console.log(watchListArray, "ddd");
    setWatchListArray((watchListArrayy) => [
      ...watchListArray,
      { title: inputValue },
    ]);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col p">
      {/* the input fied */}
      <Paper
        component="form"
        sx={{
          bgcolor: "success.main",
          mt: "10px",
          display: "flex",
          alignItems: "center",
          width: "22rem",
          height: "3rem",
          borderRadius: "12px",
          boxShadow: "0",
          border: "1px solid",
          borderColor: "secondary.main",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="افزودن دیده بان جدید"
        />
        <Divider sx={{ height: 28 }} orientation="vertical" />
        <IconButton
          onClick={() => handleInputClick(inputValue)}
          size="large"
          sx={{ p: "10px" }}
        >
          <AddTwoToneIcon className="text-green-600" fontSize="large" />
        </IconButton>
      </Paper>
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
          {watchListArray.map((item, index) => (
            <ListItemButton
              key={item.title}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <AccountTreeIcon color="info" />
              </ListItemIcon>
              <ListItemText primary={item.title} />
              <div>
                <IconButton size="medium">
                  <EditCalendarOutlinedIcon fontSize="inherit" color="info" />
                </IconButton>
                <IconButton size="medium">
                  <HighlightOffRoundedIcon fontSize="inherit" color="warning" />
                </IconButton>
              </div>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
}

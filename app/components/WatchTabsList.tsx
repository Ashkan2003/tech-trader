"use client";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

// this component is for adding, deleting,and updating a watch 
export default function WatchTabsList() {
  const watchList: { id: number; title: string }[] = [
    { id: 1, title: "سهام اصلی" },
    { id: 2, title: "سهام ایبیی" },
  ];
  const [watchListArray, setWatchListArray] = useState(watchList); // the  array of watchList
  const [inputValue, setInputValue] = useState(""); // the value of input
  const [selectedIndex, setSelectedIndex] = useState(1); // the current selected watch from the list

  // this funcrion is for add a new watch to the watchList
  const handleInputAddBtn = (watchName: string) => {
    setWatchListArray((ListArray) => [
      ...ListArray,
      { id: Math.random(), title: watchName },
    ]);
    console.log(watchListArray, "ddd");
  };

  // this function is for deleting the selected watch from the watchList by its id
  const handleListDeleteBtn = (currentId: number) => {
    setWatchListArray((ListArray) =>
      ListArray.filter((item) => {
        return item.id !== currentId;
      })
    );
  };

  // this function is for activating the selected watch by adding some style
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
          onClick={() => handleInputAddBtn(inputValue)}
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
              key={item.id}
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
                <IconButton
                  onClick={() => handleListDeleteBtn(item.id)}
                  size="medium"
                >
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

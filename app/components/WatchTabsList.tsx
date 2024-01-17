"use client";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { time } from "console";
import React, { useState } from "react";

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
  };

  // this function is for deleting the selected watch from the watchList by its id
  const handleListDeleteBtn = (currentId: number) => {
    setWatchListArray((listArray) =>
      listArray.filter((item) => {
        return item.id !== currentId;
      })
    );
  };

  // this function is for updating the selected watch
  const handleUpdateWatchBtn = (currentId: number, newTitle: string) => {
    const copyWatchListArray = [...watchListArray]; // we do this to perevent the aaray confilict in memory
    let updatedWatchList = copyWatchListArray.map((watch) => {
      // map throug the watchListArray
      if (watch.id == currentId) {
        //find the watch we want to update and return it with the newValeu
        return { id: currentId, title: newTitle };
      } else {
        // then return the outher watchs
        return watch;
      }
    });
    setWatchListArray(updatedWatchList); // then put the new array to the watchListArray
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
              <div className="flex">
                <FormDialog
                  watch={item}
                  handleUpdateWatchBtn={handleUpdateWatchBtn}
                />
                <IconButton
                  onClick={() => handleListDeleteBtn(item.id)}
                  size="medium"
                >
                  <HighlightOffRoundedIcon fontSize="inherit" color="warning" />
                </IconButton>
              </div>
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
}
////////////////////////////FormDialog-component//////////////////////////////////////////////
interface Props {
  watch: { id: number; title: string };
  handleUpdateWatchBtn: any;
}

function FormDialog({ watch, handleUpdateWatchBtn }: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // console.log(inputValue,"ssssss")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} size="medium">
        <EditCalendarOutlinedIcon fontSize="inherit" color="info" />
      </IconButton>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>ویرایش دیده بان {watch.title}</DialogTitle>
        <Divider />
        <DialogContent sx={{bgcolor:"ternery.main",py:"2rem"}}>
          <div className="flex items-center justify-between mb-16">
            <Typography>نام دیده بان:</Typography>
            <TextField
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              id="outlined-basic"
              label="نام دیده جدید دیدبان"
              variant="outlined"
            />
          </div>
          <div className="flex items-center justify-between">
            <Typography>افزودن نماد به دیده بان:</Typography>
            <Autocomplete
              sx={{minWidth:"350px"}}
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              defaultValue={[top100Films[2]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="لیست نماد های انتخاب شده"
                  placeholder="نماد جدید"
                />
              )}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            startIcon={
              <HighlightOffRoundedIcon fontSize="inherit" color="warning" />
            }
          >
            بستن
          </Button>
          <Button
            onClick={() => {
              handleUpdateWatchBtn(watch.id, inputValue); // update the watch
              handleClose(); // then close the modal
            }}
            variant="contained"
            startIcon={<SaveAsRoundedIcon color="secondary" />}
          >
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

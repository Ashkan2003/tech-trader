import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import { useUserWatchLists } from "../features/reactQueryWatchList/useUserWatchLists";
import WatchListDeleteBtn from "./WatchListDeleteBtn";
import WatchTabInput from "./WatchTabInput";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import HighlightOffRounded from "@mui/icons-material/HighlightOffRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useSymbols } from "../features/reactQuerySymbols/useSymbols";
import { useUpdateWatchList } from "../features/reactQueryWatchList/useUpdateWatchList";
// this component is for adding, deleting,and updating a watch
export default function WatchTabsList() {
  const [inputValue, setInputValue] = useState(""); // the value of input
  const [selectedIndex, setSelectedIndex] = useState(1); // the current selected watch from the list
  const { isLoading, watchLists } = useUserWatchLists();
  // if is loading return a skeleton
  if (isLoading)
    return (
      <Stack paddingTop={2} paddingX={1} spacing={1}>
        <Stack gap={1} flexDirection="row">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={300}
            height={50}
          />
          <Skeleton animation="wave" variant="rounded" width={70} height={50} />
        </Stack>
        <Skeleton animation="wave" variant="rounded" width="full" height={35} />
        <Skeleton animation="wave" variant="rounded" width="full" height={35} />
        <Skeleton animation="wave" variant="rounded" width="full" height={35} />
        <Skeleton animation="wave" variant="rounded" width="full" height={35} />
        <Skeleton animation="wave" variant="rounded" width="full" height={35} />
        <Skeleton animation="wave" variant="rounded" width="full" height={35} />
      </Stack>
    );

  // this function is for activating the selected watch by adding some style
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex items-center flex-col ">
      {/* the input fied */}
      <WatchTabInput inputValue={inputValue} setInputValue={setInputValue} />
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
          {watchLists!.map((item, index) => (
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
              {index == 0 || ( // with this code i said that dont render(map) the first item so the user canot delete or edit the first-watch-List
                <div className="flex">
                  {/* this is the dialog-btn */}
                  <FormDialog
                    watchId={item.id}
                    watchTitle={item.title}
                    watchSymbols={item.symbols}
                  />
                  {/*  this is the watch-list delete-btn */}
                  <WatchListDeleteBtn itemId={item.id} />
                </div>
              )}
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
}

////////////////////////////FormDialog-component//////////////////////////////////////////////
interface Props {
  watchTitle: string;
  watchId: number;
  watchSymbols: string;
}

function FormDialog({ watchId, watchTitle, watchSymbols }: Props) {
  // conver the watchSymbols-string to an array of stings. like "شیران,داتام" to ["داتام","شیران"]
  const defaultSymbols = watchSymbols === "" ? [] : watchSymbols.split(",");

  // the states
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(watchTitle);
  const [newSymbols, setNewSymbols] = useState(defaultSymbols);
  // these are from react-query
  const { sybmols, isLoading } = useSymbols();
  const { mutate } = useUpdateWatchList();

  if (isLoading) return null;

  // we want the entire symbols-name to give them to the options-prperty of auto-compelte-box to show them to the user
  // the optionSymbols is an array of symbols-name
  const optionSymbols = sybmols?.map((symbol) => {
    return symbol.symbolName;
  });

  // this function is for updating the selected watch symbols and title
  const handleUpdateWatch = (
    currentId: number,
    currentTitle: string,
    newSymbols: string[]
  ) => {
    const stringfyNewSymbolsArray = newSymbols.toString();

    // update the watch
    mutate({
      id: currentId,
      title: currentTitle,
      symbols: stringfyNewSymbolsArray,
    });

    //in the end close the dialog
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} size="medium">
        <EditCalendarIcon fontSize="inherit" color="info" />
      </IconButton>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>ویرایش دیده بان {watchTitle}</DialogTitle>
        <Divider />
        <DialogContent sx={{ bgcolor: "ternery.main", py: "2rem" }}>
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
              value={newSymbols}
              onChange={(event: any, newValue: any) => {
                setNewSymbols(newValue);
              }}
              sx={{ minWidth: "350px" }}
              multiple
              id="tags-outlined"
              options={optionSymbols!}
              getOptionLabel={(option) => option}
              // defaultValue={defualt}
              filterSelectedOptions
              // these two func are the solution of the error
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                );
              }}
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                  />
                ));
              }}
              //////////////////////////////////////////////
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
              <HighlightOffRounded fontSize="inherit" color="warning" />
            }
          >
            بستن
          </Button>
          <Button
            // type="submit"
            onClick={() => handleUpdateWatch(watchId, inputValue, newSymbols)}
            variant="contained"
            startIcon={<SaveOutlinedIcon color="secondary" />}
          >
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

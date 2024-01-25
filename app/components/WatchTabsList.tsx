import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
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
import WatchTabInput from "./WatchTabInput";
import { useDeleteWatchList } from "../features/reactQueryWatchList/useDeleteWatchList";

// this component is for adding, deleting,and updating a watch
export default function WatchTabsList() {
  // const watchList: { id: number; title: string; symbols: string[] }[] = [
  //   { id: 1, title: "سهام اصلی", symbols: [] },
  //   { id: 2, title: "سهام ایبیی", symbols: [] },
  // ];
  // const [watchListArray, setWatchListArray] = useState(watchList); // the  array of watchList
  const [inputValue, setInputValue] = useState(""); // the value of input
  const [selectedIndex, setSelectedIndex] = useState(1); // the current selected watch from the list
  const { error, isLoading, watchLists } = useUserWatchLists();
  const {mutate}=useDeleteWatchList()
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

  // this function is for deleting the selected watch from the watchList by its id
  const handleListDeleteBtn = (currentId: number) => {
    mutate(currentId)
  };

  // // this function is for updating the selected watch symbols and title
  // const handleUpdateWatch = (
  //   currentId: number,
  //   currentTitle: string,
  //   newSymbols: string[]
  // ) => {
  //   const copyWatchListArray = [...watchListArray]; // we do this to perevent the aaray confilict in memory
  //   let updatedWatchList = copyWatchListArray.map((watch) => {
  //     // map throug the watchListArray
  //     if (watch.id == currentId) {
  //       //find the watch we want to update its symbols-array by its id and return it with the newValeu
  //       // set the unUsed propertis like(title,id) by spreading the watch-obj
  //       return { ...watch, title: currentTitle, symbols: [...newSymbols] };
  //     } else {
  //       // then return the outher watchs
  //       return watch;
  //     }
  //   });
  //   setWatchListArray(updatedWatchList); // then put the new array to the watchListArray
  // };


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
                  <FormDialog // this is the dialog-btn
                  // watch={item}
                  // handleUpdateWatch={handleUpdateWatch}
                  />
                  <IconButton // this is the delete-btn
                    onClick={() => handleListDeleteBtn(item.id)}
                    size="medium"
                  >
                    <HighlightOffRoundedIcon
                      fontSize="inherit"
                      color="warning"
                    />
                  </IconButton>
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
  watch: { id: number; title: string; symbols: string[] };
  handleUpdateWatch: any;
}

function FormDialog() {
  // const [open, setOpen] = useState(false);
  // const [inputValue, setInputValue] = useState(watch.title);
  // const [newSymbols, setNewSymbols] = useState(watch.symbols);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleSaveBtn = () => {
  //   // when the user click on svae-btn then update the current watch
  //   handleUpdateWatch(watch.id, inputValue, newSymbols);
  //   //in the end close the dialog
  //   handleClose();
  // };

  // return (
  //   <React.Fragment>
  //     <IconButton onClick={handleClickOpen} size="medium">
  //       <EditCalendarOutlinedIcon fontSize="inherit" color="info" />
  //     </IconButton>
  //     <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
  //       <DialogTitle>ویرایش دیده بان {watch.title}</DialogTitle>
  //       <Divider />
  //       <DialogContent sx={{ bgcolor: "ternery.main", py: "2rem" }}>
  //         <div className="flex items-center justify-between mb-16">
  //           <Typography>نام دیده بان:</Typography>
  //           <TextField
  //             value={inputValue}
  //             onChange={(event) => setInputValue(event.target.value)}
  //             id="outlined-basic"
  //             label="نام دیده جدید دیدبان"
  //             variant="outlined"
  //           />
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <Typography>افزودن نماد به دیده بان:</Typography>
  //           <Autocomplete
  //             value={newSymbols}
  //             onChange={(event: any, newValue: any) => {
  //               setNewSymbols(newValue);
  //             }}
  //             sx={{ minWidth: "350px" }}
  //             multiple
  //             id="tags-outlined"
  //             options={top100Films}
  //             getOptionLabel={(option) => option}
  //             defaultValue={watch.symbols}
  //             filterSelectedOptions
  //             // these two func are the solution of the error
  //             renderOption={(props, option) => {
  //               return (
  //                 <li {...props} key={option}>
  //                   {option}
  //                 </li>
  //               );
  //             }}
  //             renderTags={(tagValue, getTagProps) => {
  //               return tagValue.map((option, index) => (
  //                 <Chip
  //                   {...getTagProps({ index })}
  //                   key={option}
  //                   label={option}
  //                 />
  //               ));
  //             }}
  //             //////////////////////////////////////////////
  //             renderInput={(params) => (
  //               <TextField
  //                 {...params}
  //                 label="لیست نماد های انتخاب شده"
  //                 placeholder="نماد جدید"
  //               />
  //             )}
  //           />
  //         </div>
  //       </DialogContent>

  //       <DialogActions>
  //         <Button
  //           variant="contained"
  //           onClick={handleClose}
  //           startIcon={
  //             <HighlightOffRoundedIcon fontSize="inherit" color="warning" />
  //           }
  //         >
  //           بستن
  //         </Button>
  //         <Button
  //           // type="submit"
  //           onClick={handleSaveBtn}
  //           variant="contained"
  //           startIcon={<SaveAsRoundedIcon color="secondary" />}
  //         >
  //           ذخیره
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </React.Fragment>
  // );
  return <div></div>;
}

const top100Films = [
  "The Sh",
  "The God",
  "The Godfather: Part II",
  "The Dark Knight",
];

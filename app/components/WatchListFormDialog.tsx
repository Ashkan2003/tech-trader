import {
  IconButton,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useSymbols } from "../features/reactQuerySymbols/useSymbols";
import { useUpdateWatchList } from "../features/reactQueryWatchList/useUpdateWatchList";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import HighlightOffRounded from "@mui/icons-material/HighlightOffRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

interface Props {
  watchTitle: string;
  watchId: number;
  watchSymbols: string;
}

function WatchListFormDialog({ watchId, watchTitle, watchSymbols }: Props) {
  // conver the watchSymbols-string to an array of stings. like "شیران,داتام" to ["داتام","شیران"]
  // to prevent that the split()-method convert empty "" to [], i put a condition
  const defaultSymbols = watchSymbols === "" ? [] : watchSymbols.split(",");

  // the states
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(watchTitle);
  const [newSymbols, setNewSymbols] = useState(defaultSymbols);
  // these are from react-query
  const { dataBaseSybmols, isLoading } = useSymbols();
  const { mutate } = useUpdateWatchList();

  if (isLoading) return null;

  // we want the entire symbols-name to give them to the options-prperty of auto-compelte-box to show them to the user
  // the optionSymbols is an array of symbols-name
  const optionSymbols = dataBaseSybmols?.map((symbol) => {
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
    <>
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
              color="info"
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
                  color="info"
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
    </>
  );
}

export default WatchListFormDialog;

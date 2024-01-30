import HighlightOffRounded from "@mui/icons-material/HighlightOffRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    TextField,
    Typography
} from "@mui/material";
import { Symbols } from "@prisma/client";
import { useState } from "react";
import BuySaleDialogTitle from "./BuySaleDialogTitle";


interface Props {
  currentSymbol: Symbols;
}

function BuySaleDialog({ currentSymbol }: Props) {
  // the states
  const [open, setOpen] = useState(false);

  // if the currentSymbol was null dont render this component
  if (currentSymbol == null) return null;

  // this function is for updating the selected watch symbols and title
  const handleUpdateWatch = (
    currentId: number,
    currentTitle: string,
    newSymbols: string[]
  ) => {
    const stringfyNewSymbolsArray = newSymbols.toString();

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
      <Button
        sx={{ margin: "0.5rem" }}
        size="large"
        variant="outlined"
        color="warning"
        startIcon={<ShoppingCartIcon className="text-green-600" />}
        onClick={handleClickOpen}
      >
        <Typography className="text-green-600">خرید</Typography>
      </Button>
      <Button
        color="warning"
        variant="outlined"
        size="large"
        startIcon={<ShoppingCartIcon className="text-red-600" />}
        onClick={handleClickOpen}
      >
        <Typography className="text-red-600">فروش</Typography>
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        {/* the dialog title section */}
        <BuySaleDialogTitle
          symbolName={currentSymbol.symbolName}
          symbolState={currentSymbol.state}
          handleClose={handleClose}
        />
        <Divider />
        {/* the dialog content section */}
        <DialogContent sx={{ bgcolor: "ternery.main", py: "2rem" }}>
          <div className="flex items-center justify-between mb-6">
            <Typography>قیمت:</Typography>
            <TextField
              color="info"
              //   value={inputValue}
              //   onChange={(event) => setInputValue(event.target.value)}
              id="outlined-basic"
              label="نام دیده جدید دیدبان"
              variant="outlined"
            />
          </div>
          <div className="flex items-center justify-between">
            <Typography>قیمت:</Typography>
            <TextField
              color="info"
              //   value={inputValue}
              //   onChange={(event) => setInputValue(event.target.value)}
              id="outlined-basic"
              label="نام دیده جدید دیدبان"
              variant="outlined"
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
            // onClick={() => handleUpdateWatch(watchId, inputValue, newSymbols)}
            variant="contained"
            startIcon={<SaveOutlinedIcon color="secondary" />}
          >
            ثبت سفارش
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BuySaleDialog;

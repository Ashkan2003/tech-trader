import HighlightOffRounded from "@mui/icons-material/HighlightOffRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Symbols } from "@prisma/client";
import { useState } from "react";
import BuySaleDialogTitle from "./BuySaleDialogTitle";
import BuySaleTabList from "./BuySaleTabList";

interface Props {
  currentSymbol: Symbols;
}

function BuySaleDialog({ currentSymbol }: Props) {
  // the states
  const [open, setOpen] = useState(false);
  const [priceInputValue, setPriceInputValue] = useState(0);
  const [volumeInputValue, setVolumeInputValue] = useState(0);
  const [tabListIndexvalue, setTabListIndexvalue] = useState(0);

  // if the currentSymbol was null dont render this component
  if (currentSymbol == null) return null;

  // this is for opening the dialog // and open the buyTab
  const handleClickOpenBuyDialog = () => {
    setTabListIndexvalue(0);
    setOpen(true);
  };

  // this is for opening the dialog // and open the saleTab
  const handleClickOpenSaleDialog = () => {
    setTabListIndexvalue(1);
    setOpen(true);
  };

  // this is for the closing of the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // this is for the set the max-price to the inpit-price
  const handleSetMaxPrice = () => {
    setPriceInputValue(currentSymbol.lastPrice);
  };

  // this is for the set the least-price to the inpit-price
  const handleSetLeastPrice = () => {
    setPriceInputValue(currentSymbol.theLeast);
  };

  // this is for the set the max-volume to the volume-price
  const handleSetMaxVolume = () => {
    setVolumeInputValue(100);
  };

  // this is for the set the least-volume to the volume-price
  const handleSetLeastVolume = () => {
    setVolumeInputValue(10);
  };

  // this is for setting the current-symbol-count to the volume-imput
  const handleSetUserBoughtSymbolCountToVulomeInput = (
    event: any,
    userProperty: string
  ) => {
    setVolumeInputValue(parseInt(userProperty));
  };

  return (
    <>
      <Button
        sx={{ margin: "0.5rem", width: { xs: "130px", md: "100px" } }}
        // size="large"
        variant="outlined"
        color="warning"
        startIcon={<ShoppingCartIcon className="text-green-600" />}
        onClick={handleClickOpenBuyDialog}
      >
        <Typography className="text-green-600">خرید</Typography>
      </Button>
      <Button
        color="warning"
        variant="outlined"
        sx={{ width: { xs: "130px", md: "100px" } }}
        startIcon={<ShoppingCartIcon className="text-red-600" />}
        onClick={handleClickOpenSaleDialog}
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
        <DialogContent
          sx={{ bgcolor: "ternery.main", py: "2rem", px: "0.7rem" }}
        >
          {/* price-field */}
          <div className="flex gap-2 items-center justify-between mb-6">
            <Typography>قیمت:</Typography>
            <TextField
              color="info"
              type="number"
              sx={{ width: { sm: "30rem" } }}
              value={priceInputValue}
              onChange={(event) =>
                setPriceInputValue(parseInt(event.target.value))
              }
              id="outlined-basic"
              label="قیمت پیشنهادی"
              variant="outlined"
            />
            <ButtonGroup orientation="vertical">
              <Button
                onClick={handleSetMaxPrice}
                sx={{ height: "28px" }}
                color="info"
                key="one"
              >
                {currentSymbol.lastPrice}
              </Button>
              <Button
                onClick={handleSetLeastPrice}
                sx={{ height: "28px" }}
                color="info"
                key="two"
              >
                {currentSymbol.theLeast}
              </Button>
            </ButtonGroup>
          </div>
          {/* volume-field */}
          <div className="flex gap-3 items-center justify-between mb-6">
            <Typography>حجم:</Typography>
            <TextField
              color="info"
              type="number"
              sx={{ width: { sm: "30rem" } }}
              value={volumeInputValue}
              onChange={(event) =>
                setVolumeInputValue(parseInt(event.target.value))
              }
              id="outlined-basic"
              label="حجم پیشنهادی"
              variant="outlined"
            />
            <ButtonGroup orientation="vertical">
              <Button
                onClick={handleSetMaxVolume}
                sx={{ height: "28px" }}
                color="info"
                key="one"
              >
                100
              </Button>
              <Button
                onClick={handleSetLeastVolume}
                sx={{ height: "28px" }}
                color="info"
                key="two"
              >
                10
              </Button>
            </ButtonGroup>
          </div>
          <Divider variant="fullWidth" sx={{ py: "20px" }} />
          {/* buySale-tabList */}
          <BuySaleTabList
            priceInputValue={priceInputValue}
            volumeInputValue={volumeInputValue}
            tabListIndexvalue={tabListIndexvalue}
            setPriceInputValue={setPriceInputValue}
            setVolumeInputValue={setVolumeInputValue}
            setTabListIndexvalue={setTabListIndexvalue}
            handleSetUserBoughtSymbolCountToVulomeInput={
              handleSetUserBoughtSymbolCountToVulomeInput
            }
            handleClose={handleClose}
          />
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

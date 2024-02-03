"use client";
import AutoCompleteBox from "./AutoCompleteBox";
import { Button, Typography } from "@mui/material";
import Badge from "../../ui/Badge";
import { useAppSelectore } from "@/app/GlobalRedux/store";
import BuySaleDialog from "./BuySaleDialog";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
const MainColHeader = () => {
  const currentReduxSymbol = useAppSelectore(
    (state) => state.tableSymbolsReducer.currentSelectedTableSymbol
  );

  const currentSymbolTitle =
    currentReduxSymbol?.symbolName == null
      ? "---"
      : currentReduxSymbol.symbolName;

  const lastPricePercentage =
    currentReduxSymbol?.lastPricePercentage == null
      ? "00"
      : currentReduxSymbol?.lastPricePercentage.toString();

  const theFirstPrice =
    currentReduxSymbol?.theFirst == null
      ? "000"
      : currentReduxSymbol.theFirst.toString();
  /////////////////////////////
  return (
    <div className="md:flex md:items-center md:justify-between   bg-[#D3D9DF] dark:bg-[#324045] ">
      {/* the main search-bar */}
      <AutoCompleteBox />
      <div className="grid grid-cols-2 gap-x-4 sm:gap-0 sm:flex sm:pt-0 sm:me-0 me-2 pt-2  items-center ">
        {/* the selected symbol title */}
        <Button
          color="info"
          sx={{ margin: "0.5rem", width: { xs: "80px", md: "100px" } }}
          disableRipple
          disableTouchRipple
          variant="outlined"
          startIcon={<TroubleshootIcon />}
        >
          <Typography>{currentSymbolTitle}</Typography>
        </Button>
        {/* the selected symbol price feilds */}
        <div className="flex pt-1">
          <div className="flex flex-col pe-1 space-y-1">
            <Badge title={theFirstPrice} color="secondary" />
            <Badge title={`${lastPricePercentage}%`} color="secondary" />
          </div>
          <Typography
            className="text-gray-600 dark:text-[#CE93D8]"
            fontSize="26px"
          >
            {currentReduxSymbol?.lastPrice == null
              ? "0000"
              : currentReduxSymbol.lastPrice}
          </Typography>
        </div>
        {/* the BuySaleDialog */}
        <BuySaleDialog currentSymbol={currentReduxSymbol!} />
      </div>
    </div>
  );
};

export default MainColHeader;

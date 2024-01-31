"use client";
import AutoCompleteBox from "./AutoCompleteBox";
import { Typography } from "@mui/material";
import Badge from "../../ui/Badge";
import { useAppSelectore } from "@/app/GlobalRedux/store";
import BuySaleDialog from "./BuySaleDialog";
const MainColHeader = () => {
  const currentReduxSymbol = useAppSelectore(
    (state) => state.tableSymbolsReducer.currentSelectedTableSymbol
  );

  const lastPricePercentage =
    currentReduxSymbol?.lastPricePercentage == null
      ? "00"
      : currentReduxSymbol?.lastPricePercentage.toString();

  const theFirstPrice =
    currentReduxSymbol?.theFirst == null
      ? "000"
      : currentReduxSymbol.theFirst.toString();

  return (
    <div className="flex h-14 items-center justify-between bg-[#D3D9DF] dark:bg-[#324045] ">
      {/* the main search-bar */}
      <AutoCompleteBox />
      <div className="pe-4 flex items-center">
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
        <BuySaleDialog currentSymbol={currentReduxSymbol!}/>
      </div>
    </div>
  );
};

export default MainColHeader;

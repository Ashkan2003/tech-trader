"use client";
import AutoCompleteBox from "./AutoCompleteBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Typography } from "@mui/material";
import Badge from "../../ui/Badge";
import { useAppSelectore } from "@/app/GlobalRedux/store";
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
    <div className="flex items-center justify-between bg-[#D3D9DF] dark:bg-[#324045] ">
      <AutoCompleteBox />
      <div className="pe-4 flex items-center">
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
        <Button
          sx={{ margin: "0.5rem" }}
          size="large"
          variant="outlined"
          color="warning"
          startIcon={<ShoppingCartIcon className="text-green-600" />}
        >
          <Typography className="text-green-600">خرید</Typography>
        </Button>
        <Button
          color="warning"
          variant="outlined"
          size="large"
          startIcon={<ShoppingCartIcon className="text-red-600" />}
        >
          <Typography className="text-red-600">فروش</Typography>
        </Button>
      </div>
    </div>
  );
};

export default MainColHeader;

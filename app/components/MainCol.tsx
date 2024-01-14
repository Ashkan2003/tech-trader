import React from "react";
import AutoCompleteBox from "./AutoCompleteBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Typography } from "@mui/material";
import Badge from "./Badge";
const MainCol = () => {
  return (
    <div className="flex items-center justify-between bg-[#D3D9DF] ">
      <AutoCompleteBox />
      <div className="pe-4 flex items-center">
        <div className="flex ">
          <div className="flex flex-col pe-1 space-y-1">
            <Badge title="4,709" color="secondary" />
            <Badge title="0.97%" color="secondary" />
          </div>
          <Typography color="primary" fontSize="26px">
            4,709
          </Typography>
        </div>
        <Button
          sx={{ margin: "0.5rem" }}
          size="large"
          variant="outlined"
          className=""
          startIcon={<ShoppingCartIcon className="text-green-600" />}
        >
          <Typography className="text-green-600">خرید</Typography>
        </Button>
        <Button
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

export default MainCol;

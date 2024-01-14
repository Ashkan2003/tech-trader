// "use client"
import React from "react";
import AutoCompleteBox from "./AutoCompleteBox";
// import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const MainCol = () => {
  return (
    <div className="bg-[#D3D9DF] ">
      <AutoCompleteBox />
      <div>
        {/* <Button variant="outlined" startIcon={<ShoppingCartIcon />}> */}
          <Typography>خرید</Typography>
        {/* </Button> */}
        {/* <Button variant="outlined" startIcon={<ShoppingCartIcon />}> */}
        {/* <Typography>فروش</Typography> */}
          
        {/* </Button> */}
      </div>
    </div>
  );
};

export default MainCol;

import { Grid, Typography } from "@mui/material";
import React from "react";

const SymbolInfoBox = () => {
  return (
    <div>
      {/* symbol title */}
      {/* <Typography textAlign="center">نام نماد: ساخت</Typography> */}

      <Grid container>
        <Grid item>
          <div className="bg-gray-600 w-44 h-11"></div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SymbolInfoBox;

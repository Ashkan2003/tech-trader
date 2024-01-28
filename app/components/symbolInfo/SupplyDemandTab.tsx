import Badge from "@/app/ui/Badge";
import { Typography } from "@mui/material";
import React from "react";

const SupplyDemandTab = () => {
  return (
    <div className="space-y-3">
      {/* symbol title */}
      <Typography textAlign="center">نام نماد: ساخت</Typography>
      {/* symbol price */}
      <div className="flex justify-around">
        <div className="flex flex-col items-center space-y-1">
          <Typography color="cusBlue.main" fontSize="13px">
            قیمت پایانی
          </Typography>
          <div className="flex items-center">
            <Typography variant="h5">4,785</Typography>
            <div className="flex flex-col space-y-1 ">
              <Badge title="456.37" color="ternery" />
              <Badge title="0.47%" color="ternery" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <Typography color="cusBlue.main" fontSize="13px">
            قیمت آخرین معامله
          </Typography>
          <div className="flex items-center">
            <Typography variant="h5">4,785</Typography>
            <div className="flex flex-col space-y-1 ">
              <Badge title="456.37" color="ternery" />
              <Badge title="0.47%" color="ternery" />
            </div>
          </div>
        </div>
      </div>
      {/* symbol table */}
    </div>
  );
};

export default SupplyDemandTab;

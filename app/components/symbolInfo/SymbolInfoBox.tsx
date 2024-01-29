import { Grid, Typography } from "@mui/material";
import React from "react";

const SymbolInfoBox = () => {
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
   
      <div className="grid grid-cols-2 gap-[1px]">
        {x.map((item, index) => (
          <div
            key={index}
            className="bg-stone-200 hover:bg-yellow-300 h-11 p-1 ps-2 dark:bg-gray-600 dark:hover:bg-[#d1bb1597] hover:dark:text-white transition-all cursor-pointer"
          >
            <Typography>تعداد معاملات</Typography>
            <Typography>138</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymbolInfoBox;

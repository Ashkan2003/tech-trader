import Badge from "@/app/ui/Badge";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Symbols } from "@prisma/client";
import React from "react";

function createData(buyCount: number, buyVolume: number, buyPrice: number) {
  return { buyCount, buyVolume, buyPrice };
}

const rows = [
  createData(159, 6.0, 24),
  createData(237, 9.0, 37),
  createData(262, 16.0, 24),
  createData(305, 3.7, 67),
  createData(356, 16.0, 49),
];

interface Props {
  currentSymbol: Symbols;
}

const SupplyDemandTab = ({ currentSymbol }: Props) => {
  return (
    <div className="space-y-5">
      {/* symbol title */}
      <Typography textAlign="center">نام نماد: {currentSymbol.symbolName}</Typography>
      {/* symbol price */}
      <div className="flex justify-around">
        <div className="flex flex-col items-center space-y-1">
          <Typography color="cusBlue.main" fontSize="13px">
            قیمت پایانی
          </Typography>
          <div className="flex items-center">
            <Typography variant="h5">{currentSymbol.lastPrice}</Typography>
            <div className="flex flex-col space-y-1 ">
              <Badge title={currentSymbol.theFirst.toString()} color="ternery" />
              <Badge title={`${currentSymbol.lastPricePercentage.toString()}%`} color="ternery" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <Typography color="cusBlue.main" fontSize="13px">
            قیمت آخرین معامله
          </Typography>
          <div className="flex items-center">
            <Typography variant="h5">{currentSymbol.lastDeal}</Typography>
            <div className="flex flex-col space-y-1 ">
              <Badge title={currentSymbol.theMost.toString()} color="ternery" />
              <Badge title={`${currentSymbol.lastDealPercentage.toString()}%`} color="ternery" />
            </div>
          </div>
        </div>
      </div>
      {/* symbol table */}
      <div className="flex">
        {/* supply-table */}
        <TableContainer sx={{ width: "200px" }}>
          <Table size="small">
            <TableHead className="bg-[#DADAFC] dark:bg-[#6060dea0]">
              <TableRow>
                <TableCell className="!ps-1" align="right">
                  تعداد
                </TableCell>
                <TableCell align="right">حجم</TableCell>
                <TableCell align="right">قیمت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-[#f7f8f9] dark:bg-slate-700" sx={{}}>
              {rows.map((row, index) => (
                <TableRow
                  className={`${index % 2 && "bg-[#E0E5E8] dark:bg-slate-500"}`}
                  key={row.buyCount}
                  sx={{
                    p: "0",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="!ps-1" align="right">
                    {row.buyCount}
                  </TableCell>
                  <TableCell align="right">{row.buyVolume}</TableCell>
                  <TableCell align="right">{row.buyPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* demand-table */}
        <TableContainer sx={{ width: "200px" }}>
          <Table size="small">
            <TableHead className="bg-[#fcdada] dark:bg-[#d15e5e7c]">
              <TableRow>
                <TableCell className="!ps-1" align="right">
                  تعداد
                </TableCell>
                <TableCell align="right">حجم</TableCell>
                <TableCell className="!pe-2" align="right">
                  قیمت
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-[#f7f8f9] dark:bg-slate-700" sx={{}}>
              {rows.map((row, index) => (
                <TableRow
                  className={`${index % 2 && "bg-[#E0E5E8] dark:bg-slate-500"}`}
                  key={row.buyCount}
                  sx={{
                    p: "0",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="!ps-1" align="right">
                    {row.buyCount}
                  </TableCell>
                  <TableCell align="right">{row.buyVolume}</TableCell>
                  <TableCell className="!pe-2" align="right">
                    {row.buyPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SupplyDemandTab;

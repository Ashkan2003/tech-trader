"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "symbol",
    // headerClassName: 'text-[#185875] bg-[#b1b6be] dark:bg-[#1f2739]',
    headerName: "نماد",
    // width: 80,
  },
  {
    field: "volume",
    headerName: "حجم",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 80,
  },
  {
    field: "lastDeal",
    headerName: "آخرین م",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "lastDealPercentage",
    headerName: "%آخرین م",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "lastPrice",
    headerName: "ق پایانی",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "lastPricePercentage",
    headerName: "%ق پایانی",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "theFirst",
    headerName: "اولین",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "theLeast",
    headerName: "کمترین",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "theMost",
    headerName: "بیشترین",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "demandVolume",
    headerName: "ح تقاضا",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "demandPrice",
    headerName: "ق تقاضا",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "offerPrice",
    headerName: "ق عرضه",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "offerVolume",
    headerName: "ح عرضه",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
  {
    field: "state",
    headerName: "وضعیت",
    type: "number",
    align: "left",
    headerAlign: "left",
    // width: 70,
  },
];

const rows = [
  {
    id: 1,
    symbol: "ثاخت",
    volume: "82.09M",
    lastDeal: "1.68%",
    lastDealPercentage: 144,
    lastPrice: 22.3,
    lastPricePercentage: "0.89%",
    theFirst: 22.2,
    theLeast: 21.8,
    theMost: 22.75,
    demandVolume: 440,
    demandPrice: 21.9,
    offerPrice: 22.15,
    offerVolume: 2.516,
    state: "مجاز",
  },
  {
    id: 2,
    symbol: "ثاخت",
    volume: "82.09M",
    lastDeal: "1.68%",
    lastDealPercentage: 144,
    lastPrice: 22.3,
    lastPricePercentage: "0.89%",
    theFirst: 22.2,
    theLeast: 21.8,
    theMost: 22.75,
    demandVolume: 440,
    demandPrice: 21.9,
    offerPrice: 22.15,
    offerVolume: 2.516,
    state: "مجاز",
  },
  {
    id: 3,
    symbol: "ثاخت",
    volume: "82.09M",
    lastDeal: "1.68%",
    lastDealPercentage: 144,
    lastPrice: 22.3,
    lastPricePercentage: "0.89%",
    theFirst: 22.2,
    theLeast: 21.8,
    theMost: 22.75,
    demandVolume: 440,
    demandPrice: 21.9,
    offerPrice: 22.15,
    offerVolume: 2.516,
    state: "مجاز",
  },
  {
    id: 4,
    symbol: "ثاخت",
    volume: "82.09M",
    lastDeal: "1.68%",
    lastDealPercentage: 144,
    lastPrice: 22.3,
    lastPricePercentage: "0.89%",
    theFirst: 22.2,
    theLeast: 21.8,
    theMost: 22.75,
    demandVolume: 440,
    demandPrice: 21.9,
    offerPrice: 22.15,
    offerVolume: 2.516,
    state: "مجاز",
  },
];

export default function MainTable() {
  return (
    <Box sx={{ height: 455, width:"71rem" }}>
      <DataGrid
      scrollbarSize={200}
        sx={{}}
        columnHeaderHeight={40}
        rowHeight={35}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}

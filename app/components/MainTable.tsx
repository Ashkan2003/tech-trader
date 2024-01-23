"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import prisma from "@/prisma/db";
import { Symbols } from "@prisma/client";
import axios from "axios";
import { useSymbols } from "../features/useSymbols";
import { Skeleton, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
// import useSymbols from "../features/useSymbols";

const columns: GridColDef[] = [
  {
    field: "symbolName",
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

export default function MainTable() {
  const { isLoading, sybmols, error } = useSymbols();

  // if is loading return a skeleton
  if (isLoading)
    return (
      <Stack paddingTop={1} spacing={1}>
        <Skeleton animation="wave" variant="rounded" width="full" height={40} />
        <Skeleton
          animation="wave"
          variant="rounded"
          width="full"
          height={400}
        />
      </Stack>
    );

  // if there was an error then retune a toast
  if (error) return toast.error("اخطار.لطفا اتصال اینترنت خود را چک کنید.");

  const rows = sybmols?.map((symbol) => {
    return {
      id: symbol.id,
      symbolName: symbol.symbolName,
      volume: `${symbol.volume}M`,
      lastDeal: `${symbol.lastDeal}%`,
      lastDealPercentage: symbol.lastDealPercentage,
      lastPrice: symbol.lastPrice,
      lastPricePercentage: `${symbol.lastPricePercentage}%`,
      theFirst: symbol.theFirst,
      theLeast: symbol.theLeast,
      theMost: symbol.theMost,
      demandVolume: symbol.demandVolume,
      demandPrice: symbol.demandPrice,
      offerPrice: symbol.offerPrice,
      offerVolume: symbol.offerVolume,
      state: symbol.state,
    };
  });

  return (
    <Box sx={{ height: 455, bgcolor: "ternery.main" }}>
      <DataGrid
        loading={isLoading}
        scrollbarSize={200}
        columnHeaderHeight={40}
        rowHeight={35}
        rows={rows!}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}

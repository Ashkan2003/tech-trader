"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 90 },
  {
    field: "symbol",
    headerName: "نماد",
    // width: 6/0,
    editable: false,
  },
  {
    field: "volume",
    headerName: "حجم",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "آخرین م",
    // type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "آخرین م%",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, symbol: "ثاخت", volume: "Jon", age: 14 },
  { id: 1, symbol: "الکترون", volume: "Jon", age: 14 },
  { id: 1, symbol: "ثاخت", volume: "Jon", age: 14 },
  { id: 1, symbol: "ثاخت", volume: "Jon", age: 14 },
  { id: 2, symbol: "دماوند", volume: "Cersei", age: 31 },
  { id: 2, symbol: "دماوند", volume: "Cersei", age: 31 },
  { id: 2, symbol: "دماوند", volume: "Cersei", age: 31 },
  { id: 3, symbol: "آهنکگ", volume: "Jaime", age: 31 },
  { id: 3, symbol: "وبلمت", volume: "Jaime", age: 31 },
  { id: 3, symbol: "وبلمت", volume: "Jaime", age: 31 },
  { id: 3, symbol: "وبلمت", volume: "Jaime", age: 31 },
  { id: 3, symbol: "وبلمت", volume: "Jaime", age: 31 },

];

export default function MainTable() {
  return (
    <Box sx={{ height: 455, width: "100%" }}>
      <DataGrid
        sx={{
         
        }}
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
        disableRowSelectionOnClick
      />
    </Box>
  );
}

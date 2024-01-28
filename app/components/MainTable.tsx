"use client";
import { Skeleton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useSymbols } from "../features/reactQuerySymbols/useSymbols";
import { useAppSelectore } from "../GlobalRedux/store";

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
    width: 70,
  },
  {
    field: "lastDeal",
    headerName: "آخرین م",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "lastDealPercentage",
    headerName: "%آخرین م",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "lastPrice",
    headerName: "ق پایانی",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "lastPricePercentage",
    headerName: "%ق پایانی",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "theFirst",
    headerName: "اولین",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "theLeast",
    headerName: "کمترین",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "theMost",
    headerName: "بیشترین",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "demandVolume",
    headerName: "ح تقاضا",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "demandPrice",
    headerName: "ق تقاضا",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "offerPrice",
    headerName: "ق عرضه",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "offerVolume",
    headerName: "ح عرضه",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
  {
    field: "state",
    headerName: "وضعیت",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
];

export default function MainTable() {
  // get the entire symbols from the db with react-query
  const { isLoading, dataBaseSybmols, error } = useSymbols();

  // get the selected-symbols-name that are selected by user from the watchTabsList
  const reduxSymbols = useAppSelectore(
    (state) => state.tableSymbolsReducer.reduxSymbols
  );
  // get the mainSearchBarSymbol from redux
  const mainSearchBarSymbol = useAppSelectore(
    (state) => state.tableSymbolsReducer.mainSearchBarSymbol
  );
  // get the current mode of showing whitch-symbols
  const currentShowMode = useAppSelectore(
    (state) => state.tableSymbolsReducer.currentShowMode
  );

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

  // we want to filter throg the entire db-symbols and return the symbols that symbleName in in reduxSymbols
  // boom. the magic happen here
  let dataGridSymbols;
  switch (currentShowMode) {
    case "userWatchList":
      dataGridSymbols = dataBaseSybmols?.filter((symbol) => {
        if (reduxSymbols.includes(symbol.symbolName)) {
          return symbol;
        }
      });
      break;
    case "mainSearchBarSymbol":
      dataGridSymbols = dataBaseSybmols?.filter((symbol) => {
        return symbol.symbolName === mainSearchBarSymbol;
      });
      break;
    case "techTraderWatchList":
      dataGridSymbols = dataBaseSybmols;
      break;
    default:
      break;
  }

  const rows = dataGridSymbols?.map((symbol) => {
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
      state: symbol.state === "ALLOWED" ? "مجاز" : "ممنوع",
    };
  });

  return (
    <Box sx={{ height: 455, bgcolor: "ternery.main", scrollbarColor: "blue" }}>
      <DataGrid
        loading={isLoading}
        scrollbarSize={10}
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

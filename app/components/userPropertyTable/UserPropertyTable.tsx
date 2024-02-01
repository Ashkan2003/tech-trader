"use client";
import { Skeleton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useSymbols } from "../../features/reactQuerySymbols/useSymbols";
import { AppDispatch, useAppSelectore } from "../../GlobalRedux/store";
import { Symbols } from "@prisma/client";
import { useDispatch } from "react-redux";
import { updateCurrentSelectedTableSymbol } from "@/app/GlobalRedux/Features/tableSymbols/tableSymbols-slice";
import { useUserTradeAccount } from "@/app/features/reactQueryTradeAccount/useUserTradeAccount";

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
    field: "state",
    headerName: "وضعیت",
    type: "number",
    align: "left",
    headerAlign: "left",
    width: 70,
  },
];

export default function UserPropertyTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { userTradeAccount, isLoadingTradeAccount, error } =
    useUserTradeAccount();

  // if is loading return a skeleton
  if (isLoadingTradeAccount)
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

  const rows = userTradeAccount.userBoughtSymbols.map((symbol: any) => {
    return {
      id: symbol.id,
      symbolName: symbol.symbolName,
      volume: `${symbol.volume}`,
      //   lastDeal: symbol.lastDeal,
      //   lastDealPercentage: `${symbol.lastDealPercentage}%`,
      lastPrice: symbol.lastPrice,
      lastPricePercentage: `${symbol.lastPricePercentage}%`,
      //   theFirst: symbol.theFirst,
      //   theLeast: symbol.theLeast,
      //   theMost: symbol.theMost,
      //   demandVolume: symbol.demandVolume,
      //   demandPrice: symbol.demandPrice,
      //   offerPrice: symbol.offerPrice,
      //   offerVolume: symbol.offerVolume,
      state: symbol.state === "ALLOWED" ? "مجاز" : "ممنوع",
    };
  });

  // this function is for finding the selected symbol and give it to the redux
  function handleRowSelectionClick(currentSymbolName: string) {
    // find the current-selected-symbol from the table and return it
    const currentSelectedTableSymbol = userTradeAccount.userBoughtSymbols.find(
      (symbol: any) => {
        return symbol.symbolName === currentSymbolName;
      }
    );
    dispatch(updateCurrentSelectedTableSymbol(currentSelectedTableSymbol!));
  }
  return (
    <Box sx={{ height: 260, bgcolor: "ternery.main", scrollbarColor: "blue" }}>
      <DataGrid
        loading={isLoadingTradeAccount}
        scrollbarSize={10}
        columnHeaderHeight={40}
        onRowClick={(event) => handleRowSelectionClick(event.row.symbolName)}
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

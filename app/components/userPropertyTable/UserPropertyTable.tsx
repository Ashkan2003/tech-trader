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

interface datagridRowType {
  id: number;
  symbolName: string;
  count: number;
  lastPrice: number;
  lastPricePercentage: number;
  state: "ALLOWED" | "NOTALLOWED";
}

export default function UserPropertyTable() {
  const dispatch = useDispatch<AppDispatch>();

  // fetch all the symbols from the db
  const { dataBaseSybmols, isLoading } = useSymbols();

  // fetch the userTradeAccount from the db
  const { userTradeAccount, isLoadingTradeAccount, error } =
    useUserTradeAccount();

  // if is loading return a skeleton
  if (isLoadingTradeAccount || isLoading)
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

  let dataGridRows: datagridRowType[] = [];
  // i want more information to put in data-grid-table about a symbol, but i only stored "symbolName" and "count" in the userBoughtSymbol
  // so i loop throgh the dataBaseSymbols and find the userBoughtSymbols and push a new obj with a combine-information of bgsymbol and userBoughtSymbol
  userTradeAccount.userBoughtSymbols.map(
    (boughtSymbol: { id: number; symbolName: string; count: number }) => {
      dataBaseSybmols?.map((dbSymbol) => {
        if (dbSymbol.symbolName === boughtSymbol.symbolName) {
          dataGridRows.push({
            id: dbSymbol.id,
            symbolName: dbSymbol.symbolName,
            lastPrice: dbSymbol.lastPrice,
            lastPricePercentage: dbSymbol.lastPricePercentage,
            state: dbSymbol.state,
            count: boughtSymbol.count,
          });
        }
      });
    }
  );


  const rows = dataGridRows.map((symbol) => {
    return {
      id: symbol.id,
      symbolName: symbol.symbolName,
      volume: symbol.count,
      lastPrice: symbol.lastPrice,
      lastPricePercentage: `${symbol.lastPricePercentage}%`,
      state: symbol.state === "ALLOWED" ? "مجاز" : "ممنوع",
    };
  });

  // this function is for finding the selected symbol and give it to the redux
  function handleRowSelectionClick(currentSymbolName: string) {
    // find the current-selected-symbol from the table and return it
    const currentSelectedTableSymbol = dataBaseSybmols!.find(
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

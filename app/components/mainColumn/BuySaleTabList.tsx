"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MouseEventHandler, useState } from "react";
import { Button, TextField } from "@mui/material";
import {
  useUserTradeAccount,
  userTradeAccountType,
} from "@/app/features/reactQueryTradeAccount/useUserTradeAccount";
import { useAppSelectore } from "@/app/GlobalRedux/store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props {
  userTradeAccount: userTradeAccountType;
  finalOrderPrice: number;
  handleFinalBuy: any;
  handleSetUserBoughtSymbolCountToVulomeInput: any;
}

export default function BuySaleTabList({
  userTradeAccount,
  finalOrderPrice,
  handleFinalBuy,
  handleSetUserBoughtSymbolCountToVulomeInput,
}: Props) {
  const [value, setValue] = useState(0);
  // const { isLoadingTradeAccount, userTradeAccount } = useUserTradeAccount();

  //get the current-selected-symbol by user from redux
  const currentSymbol = useAppSelectore(
    (state) => state.tableSymbolsReducer.currentSelectedTableSymbol
  );

  // if (isLoadingTradeAccount) return null;
  // get the userProperty
  const userPropery = userTradeAccount.userProperty;
  // get the symbols that user bought
  const userBoughtSymbols = userTradeAccount.userBoughtSymbols;

  // explanation
  // we have an currentSymbol that is the current-selected-symbol by user from the main col that is stored in redux
  // in the other hand, we have a array of symbols that the user bought priviosily
  // so for fatcing this symbol name and count i looped throug the userBoughtSymbols and find it
  const userCurrentBoughtSymbol = userBoughtSymbols.find(
    (boughtSymbol: { symbolName: string; count: number }) => {
      if (boughtSymbol.symbolName === currentSymbol?.symbolName)
        return boughtSymbol;
    }
  );


  // get the currentBoughtSymbol count.if its undfind it means that the user dont bought this symbol-previosly,so set it 0
  const currentBoughtSymbolCount = userCurrentBoughtSymbol
    ? userCurrentBoughtSymbol.count
    : 0;

  // get todey-date in farsi-date
  let todayDate = new Date().toLocaleDateString("fa-IR");

  // this function is for the selection of the tab
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        bgcolor: "ternery.main",
        color: "textPallet.main",
        width: "100%",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ color: "ternary.main" }}
          textColor="inherit"
          indicatorColor="secondary"
          variant="fullWidth"
          centered
          value={value}
          onChange={handleChange}
        >
          <Tab label="خرید" sx={{ fontSize: "20px" }} {...a11yProps(0)} />
          <Tab label="فروش" sx={{ fontSize: "20px" }} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="flex-col justify-between">
          <div className="grid grid-cols-2 gap-2">
            {/* user property */}
            <TextField
              focused
              color="info"
              id="filled-read-only-input"
              label="مانده"
              value={userPropery}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <TextField
              focused
              color="info"
              id="filled-read-only-input"
              label="دارایی سپرده گزاری"
              value={currentBoughtSymbolCount}
              onClick={(event: any) =>
                handleSetUserBoughtSymbolCountToVulomeInput(event, value)
              }
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <TextField
              focused
              color="info"
              id="filled-read-only-input"
              label="اعتبار تا تاریخ:"
              defaultValue={todayDate}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </div>
          <div className="flex items-center  mt-11">
            <TextField
              value={finalOrderPrice}
              color="warning"
              focused
              label="ارزش ناخالص سفارش"
              id="outlined-size-small"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              sx={{
                width: { xs: "90px", md: "100px" },
                height: "41px",
                ml: "10px",
              }}
              size="large"
              variant="outlined"
              color="warning"
              startIcon={<ShoppingCartIcon className="text-green-600" />}
              onClick={()=>handleFinalBuy(userCurrentBoughtSymbol)}
            >
              <Typography className="text-green-600">خرید</Typography>
            </Button>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}

"use client";
import { useAppSelectore } from "@/app/GlobalRedux/store";
import { useUserTradeAccount } from "@/app/features/reactQueryTradeAccount/useUserTradeAccount";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import BuyTab from "./BuyTab";
import SaleTab from "./SaleTab";
import { useUserWatchLists } from "@/app/features/reactQueryWatchList/useUserWatchLists";

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
  priceInputValue: number;
  volumeInputValue: number;
  tabListIndexvalue: number;
  setPriceInputValue: React.Dispatch<React.SetStateAction<number>>;
  setVolumeInputValue: React.Dispatch<React.SetStateAction<number>>;
  setTabListIndexvalue: React.Dispatch<React.SetStateAction<number>>;
  handleSetUserBoughtSymbolCountToVulomeInput: any;
  handleClose: any;
}

export default function BuySaleTabList({
  priceInputValue,
  volumeInputValue,
  tabListIndexvalue,
  setPriceInputValue,
  setVolumeInputValue,
  setTabListIndexvalue,
  handleSetUserBoughtSymbolCountToVulomeInput,
  handleClose,
}: Props) {
  //get the current-selected-symbol by user from redux
  const currentSymbol = useAppSelectore(
    (state) => state.tableSymbolsReducer.currentSelectedTableSymbol
  );

  // react-query // fetch the userTradeAccount from the db
  const { userTradeAccount, isLoadingTradeAccount, error } =
    useUserTradeAccount();

  // react-query // get user watchLists
  const { watchLists, isLoading } = useUserWatchLists();

  if (isLoadingTradeAccount || isLoading) return null;

  //get the "دارایی های من"-watchList from db
  const userProperyWatchList = watchLists?.find((item) => {
    return item.title === "دارایی های من";
  });

  // get the symbols that user bought
  const userBoughtSymbols = userTradeAccount?.userBoughtSymbols;

  // explanation
  // we have an currentSymbol that is the current-selected-symbol by user from the main col that is stored in redux
  // in the other hand, we have a array of symbols that the user bought priviosily
  // so for fatcing this symbol name and count i looped throug the userBoughtSymbols and find it
  const userCurrentBoughtSymbol = userBoughtSymbols!.find(
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
    setTabListIndexvalue(newValue);
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
          value={tabListIndexvalue}
          onChange={handleChange}
        >
          <Tab label="خرید" sx={{ fontSize: "20px" }} {...a11yProps(0)} />
          <Tab label="فروش" sx={{ fontSize: "20px" }} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabListIndexvalue} index={0}>
        <BuyTab
          currentSymbol={currentSymbol!}
          userProperyWatchList={userProperyWatchList!}
          currentBoughtSymbolCount={currentBoughtSymbolCount}
          priceInputValue={priceInputValue}
          volumeInputValue={volumeInputValue}
          todayDate={todayDate}
          userCurrentBoughtSymbol={userCurrentBoughtSymbol!}
          setPriceInputValue={setPriceInputValue}
          setVolumeInputValue={setVolumeInputValue}
          userTradeAccount={userTradeAccount!}
          handleClose={handleClose}
          handleSetUserBoughtSymbolCountToVulomeInput={
            handleSetUserBoughtSymbolCountToVulomeInput
          }
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabListIndexvalue} index={1}>
        <SaleTab
          currentSymbol={currentSymbol!}
          userProperyWatchList={userProperyWatchList!}
          currentBoughtSymbolCount={currentBoughtSymbolCount}
          priceInputValue={priceInputValue}
          volumeInputValue={volumeInputValue}
          todayDate={todayDate}
          userCurrentBoughtSymbol={userCurrentBoughtSymbol!}
          setPriceInputValue={setPriceInputValue}
          setVolumeInputValue={setVolumeInputValue}
          userTradeAccount={userTradeAccount!}
          handleClose={handleClose}
          handleSetUserBoughtSymbolCountToVulomeInput={
            handleSetUserBoughtSymbolCountToVulomeInput
          }
        />
      </CustomTabPanel>
    </Box>
  );
}

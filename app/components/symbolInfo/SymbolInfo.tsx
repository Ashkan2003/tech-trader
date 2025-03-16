"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import SupplyDemandTab from "./SupplyDemandTab";
import SymbolInfoBox from "./SymbolInfoBox";
import SymbolChart from "./SymbolChart";
import { useAppSelectore } from "@/app/GlobalRedux/store";
import { useSymbols } from "@/app/features/reactQuerySymbols/useSymbols";
import SymbolPieChart from "./SymbolPieChart";
import { Stack, Skeleton } from "@mui/material";

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
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SymbolInfo() {
  const [value, setValue] = useState(0);
  const { dataBaseSybmols, isLoading } = useSymbols();

  const currentReduxSymbol = useAppSelectore(
    (state) => state.tableSymbolsReducer.currentSelectedTableSymbol
  );

  if (isLoading)
    return (
      <Stack paddingTop={2} paddingX={1} spacing={1}>
        <Stack gap={1} justifyContent="center" flexDirection="row">
          <Skeleton animation="wave" variant="rounded" width={73} height={50} />
          <Skeleton animation="wave" variant="rounded" width={73} height={50} />
          <Skeleton animation="wave" variant="rounded" width={73} height={50} />
          <Skeleton animation="wave" variant="rounded" width={73} height={50} />
        </Stack>
        <Skeleton animation="wave" variant="rounded" width="full" height={35} />
        <Skeleton animation="wave" variant="rounded" width="full" height={55} />
        <Skeleton animation="wave" variant="rounded" width="full" height={165} />
      </Stack>
    );

  // in the first enter of user the currentReduxSymbol is null.so render the first item of db
  const currentSymbol =
    currentReduxSymbol == null ? dataBaseSybmols?.at(0) : currentReduxSymbol;

  //  this function is for the tab-changes
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
          <Tab
            sx={{ fontSize: "12px" }}
            label="عرضه و تقاضا"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ fontSize: "12px" }}
            label="اطلاعات نماد"
            {...a11yProps(1)}
          />
          <Tab sx={{ fontSize: "12px" }} label="نمودار" {...a11yProps(2)} />
          <Tab
            sx={{ fontSize: "12px" }}
            label="حقیقی/حقوقی"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SupplyDemandTab currentSymbol={currentSymbol!} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SymbolInfoBox currentSymbol={currentSymbol!} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SymbolChart data={currentSymbol?.chartNumber} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SymbolPieChart
          offerVolume={currentSymbol?.offerVolume!}
          demandVolume={currentSymbol?.demandVolume!}
        />
      </CustomTabPanel>
    </Box>
  );
}

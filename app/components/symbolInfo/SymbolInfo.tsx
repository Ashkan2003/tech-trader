"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import SupplyDemandTab from "./SupplyDemandTab";
import SymbolInfoBox from "./SymbolInfoBox";

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
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
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
        <SupplyDemandTab/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SymbolInfoBox/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item یب
      </CustomTabPanel>
    </Box>
  );
}

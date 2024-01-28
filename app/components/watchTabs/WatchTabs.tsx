"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import WatchTabsList from "./UserWatchList";
import TechWatchTabList from "./TechWatchTabList";
import UserWatchList from "./UserWatchList";

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
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function WatchTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "ternery.main",
        color: "textPallet.main",
      }}
    >
      <Box sx={{ borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          centered
        >
          <Tab
            className=" !border-solid !border-t-2 !border-r-2 !border-l-2 !border-[#E0E5E8] dark:!border-[#62737c]"
            label="دیده بان من"
            {...a11yProps(0)}
          />
          <Tab
            className=" !border-solid !border-t-2 !border-r-2 !border-l-2 !border-[#E0E5E8] dark:!border-[#62737c]"
            label="دیده بان تک تریدر"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserWatchList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TechWatchTabList />
      </CustomTabPanel>
    </Box>
  );
}

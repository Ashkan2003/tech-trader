"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { GridMenuIcon } from "@mui/x-data-grid";

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
      {value === index && (
        <Box sx={{ display: "flex", justifyContent: "center", px: "0.5rem" }}>
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

export default function WatchTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="bg-[#F2F2F2]" sx={{}}>
      <Box sx={{ borderColor: "divider" }}>
        <Tabs
          sx={{ ".MuiTabs-indicator": { top: "0" } }}
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab
            className="!bg-[#F2F2F2] !border-solid !border-t-2 !border-r-2 !border-l-2 !border-[#E0E5E8]"
            label="دیده بان من"
            {...a11yProps(0)}
          />
          <Tab
            className="!bg-[#F2F2F2] !border-solid !border-t-2 !border-r-2 !border-l-2 !border-[#E0E5E8]"
            label="دیده بان تک تریدر"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paper
          component="form"
          className="!bg-[#F1F2F4]"
          sx={{
            mt: "10px",
            display: "flex",
            alignItems: "center",
            width: "22rem",
            height: "3rem",
            borderRadius: "12px",
            boxShadow: "0",
            border: "1px solid #cbc1c1",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="افزودن دیده بان جدید"
          />
          <Divider sx={{ height: 28 }} orientation="vertical" />
          <IconButton size="large" sx={{ p: "10px" }}>
            <AddTwoToneIcon className="text-green-600" fontSize="large" />
          </IconButton>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}

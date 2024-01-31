"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

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

export default function BuySaleTabList() {
  const [value, setValue] = useState(0);

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
            <TextField
              focused
              color="info"
              id="filled-read-only-input"
              label="مانده"
              defaultValue="3434566"
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
              defaultValue="66778"
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
              color="warning"
              focused
              label="ارزش ناخالص سفارش"
              id="outlined-size-small"
              defaultValue="Small"
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
              // onClick={handleClickOpen}
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

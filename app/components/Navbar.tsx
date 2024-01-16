import Image from "next/image";

import Menu from "./Menu";
import { Box, Chip, Divider, IconButton, Typography } from "@mui/material";
import DarkModeIconBtn from "./DarkModeIconBtn";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NavClock from "./NavClock";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import Badge from "./Badge";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className="bg-[#5D6E88] dark:bg-[#2D3E4A] mb-1 h-13">
      <nav className="flex  items-center justify-between  ">
        <div className="flex  items-center">
          <div className="flex items-center   pe-3 ">
            <Image src="/Trade-brand.png" alt="brand" width="50" height="30" />
            <Menu />
            <Typography color="white">منو-دیده بان کلاسیک</Typography>
          </div>
          <Divider orientation="vertical" flexItem />

          <div className=" px-4 hidden md:flex">
            <Typography className="text-white">مانده قابل معامله:</Typography>
            <Typography className="text-yellow-300 ps-1">
              17,074,601 ریال
            </Typography>
          </div>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ px: "14px", display: { xs: "none", lg: "flex" } }}>
            <div className="flex items-center">
              <Typography className="text-white">شاخص: </Typography>
              <Typography className="text-yellow-300 ps-1">
                2,170,964.07
              </Typography>
            </div>
            <div className="flex flex-col space-y-1 ps-1">
              <Badge title="456.37" color="primary" />
              <Badge title="0.47" color="primary" />
            </div>
          </Box>
          <Divider orientation="vertical" flexItem />
        </div>
        <div className="flex ">
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <Divider orientation="vertical" flexItem />
            <IconButton size="large">
              <HelpOutlineTwoToneIcon fontSize="inherit" color="secondary" />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton size="large">
              <GridViewOutlinedIcon fontSize="inherit" color="secondary" />
            </IconButton>
          </Box>
          <Divider orientation="vertical" flexItem />
          <DarkModeIconBtn />
          <Divider orientation="vertical" flexItem />
          <NavClock />
          <Divider orientation="vertical" flexItem />
          <div className="flex items-center ps-3">
            <Typography color="white" className="hidden sm:block">
              میلاد جهانی
            </Typography>
            <IconButton size="large">
              <SettingsSuggestOutlinedIcon
                fontSize="inherit"
                color="secondary"
              ></SettingsSuggestOutlinedIcon>
            </IconButton>
          </div>
          <Divider orientation="vertical" flexItem />
          <Link href="/signin">
            <IconButton size="large">
              <PowerSettingsNewRoundedIcon
                fontSize="inherit"
                sx={{ color: "yellow" }}
              ></PowerSettingsNewRoundedIcon>
            </IconButton>
          </Link>
        </div>
      </nav>
      <Divider  flexItem />
      
    </header>
  );
}

import Image from "next/image";

import Menu from "./Menu";
import { Chip, Divider, IconButton, Typography } from "@mui/material";
import DarkModeIconBtn from "./DarkModeIconBtn";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NavClock from "./NavClock";
export default function Navbar() {
  return (
    <header className="bg-[#5D6E88] dark:bg-[#2D3E4A]">
      <nav className="flex  items-center   ">
        <div className="flex  items-center">
          <div className="flex items-center bg-[#535f71]  pe-3">
            <Image src="/Trade-brand.png" alt="brand" width="50" height="30" />
            <Menu />
            <DarkModeIconBtn />
          </div>
          <div className="flex px-4">
            <Typography className="text-white">مانده قابل معامله:</Typography>
            <Typography className="text-yellow-300 ps-1">
              17,074,601 ریال
            </Typography>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex px-4 items-center">
            <div className="flex">
              <Typography className="text-white">شاخص: </Typography>
              <Typography className="text-yellow-300 ps-1">
                2,170,964.07
              </Typography>
            </div>
            <div className="flex flex-col space-y-1 ps-1">
              <Chip
                label="14,545.46"
                sx={{ height: "13px", fontSize: "small" }}
                color="success"
              />
              <Chip
                label="0.67%"
                sx={{ height: "13px", fontSize: "small" }}
                size="small"
                color="success"
              />
            </div>
          </div>
          <Divider orientation="vertical" flexItem />
        </div>
        <div className="flex">
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <HelpOutlineTwoToneIcon color="secondary" />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <GridViewOutlinedIcon color="secondary" />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <NavClock/>
        </div>
      </nav>
    </header>
  );
}

import Image from "next/image";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import Badge from "../../ui/Badge";
import DarkModeIconBtn from "./DarkModeIconBtn";
import Menu from "./Menu";
import NavClock from "./NavClock";
import NavAuthState from "./NavAuthState";
import UserProperty from "./UserProperty";
export default function Navbar() {
  return (
    <header className="bg-[#5D6E88] dark:bg-[#2D3E4A]  h-13">
      <nav className="flex  items-center justify-between  ">
        <div className="flex  items-center">
          <div className="flex items-center   pe-3 ">
            <Image src="/Trade-brand.png" alt="brand" width="50" height="30" />
            <Menu />
            <Typography className="hidden md:block" color="white">
              منو-دیده بان کلاسیک
            </Typography>
          </div>
          <Divider
            className="hidden sm:block"
            orientation="vertical"
            flexItem
          />
          <UserProperty />
          <Divider
            className="hidden sm:block"
            orientation="vertical"
            flexItem
          />
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
          <Divider
            className="hidden sm:block"
            orientation="vertical"
            flexItem
          />
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
          <Divider
            className="hidden sm:block"
            orientation="vertical"
            flexItem
          />
          <NavClock />
          <Divider
            className="hidden sm:block"
            orientation="vertical"
            flexItem
          />
          <DarkModeIconBtn />
          <Divider
            className="hidden sm:block"
            orientation="vertical"
            flexItem
          />
          <NavAuthState />
        </div>
      </nav>
      <Divider flexItem />
    </header>
  );
}

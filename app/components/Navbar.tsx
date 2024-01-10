import Image from "next/image";

import Menu from "./Menu";
import { Box, Typography } from "@mui/material";
import DarkModeIconBtn from "./DarkModeIconBtn";

export default function Navbar() {
  return (
    <header className="bg-[#5D6E88] dark:bg-[#2D3E4A]">
      <nav className="flex  items-center   ">
        <div className="flex items-center bg-[#535f71]  pe-3">
          <Image src="/Trade-brand.png" alt="brand" width="50" height="30" />
          <Menu />
          <DarkModeIconBtn />
        </div>
        <div className="flex ps-5">
          <Typography className="text-white">مانده قابل معامله: </Typography>
          <Typography className="text-yellow-300">17,074,601 ریال</Typography>
        </div>
      </nav>
    </header>
  );
}

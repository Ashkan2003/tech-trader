import { Box } from "@mui/material";
import DashbordVerticalList from "./ui/DashbordVerticalList";
import MainCol from "./components/mainColumn/MainColHeader";
import MainTable from "./components/mainColumn/MainTable";
import Navbar from "./components/navBar/Navbar";
import WatchTabs from "./components/watchTabs/WatchTabs";
import SymbolInfo from "./components/symbolInfo/SymbolInfo";
import MainColHeader from "./components/mainColumn/MainColHeader";

export default async function Home() {
  return (
    <>
      <Navbar />
      <Box bgcolor="lemon.main" className="flex">
        <div className="grid flex-grow grid-cols-12 grid-rows-4 grid-flow-col h-[92vh] gap-2 mt-2 me-2 ms-2">
          <div className="hidden  sm:block col-span-3 row-span-4 space-y-2">
            <WatchTabs />
            <SymbolInfo />
          </div>
          <div className="col-span-12 sm:col-span-9 row-span-3">
            <MainColHeader />
            <MainTable />
          </div>
          <div className="col-span-9 row-span-1 bg-gray-400">
            <div className="!w-[50px]">03</div>
          </div>
        </div>
        <div className="hidden sm:block h-[100vh] w-[53px]  bg-[#46566E] dark:bg-[#243740]">
          <DashbordVerticalList />
        </div>
      </Box>
    </>
  );
}

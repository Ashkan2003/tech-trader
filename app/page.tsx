import DashbordVerticalList from "./components/DashbordVerticalList";
import MainCol from "./components/MainCol";
import MainTable from "./components/MainTable";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="grid flex-grow col-span-11 grid-rows-4 grid-flow-col h-[92vh] gap-2 bg-[#E0E5E8] dark:bg-[#042431]">
          <div className="col-span-1 row-span-4 bg-yellow-400 ">01</div>
          <div className="col-span-3 row-span-3 bg-[#f8f9fa]">
            <MainCol />
            <MainTable/>
          </div>
          <div className="col-span-3 row-span-1 bg-gray-400">
            <div className="!w-[50px]">03</div>
          </div>
        </div>
        <div className="h-[100vh] w-[53px]  bg-[#46566E] dark:bg-[#243740]">
          <DashbordVerticalList />
        </div>
      </div>
    </>
  );
}

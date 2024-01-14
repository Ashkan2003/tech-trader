import DashbordVerticalList from "./components/DashbordVerticalList";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex ">
        <div className="grid flex-grow col-span-11   grid-rows-4 grid-flow-col h-[92vh] ">
          <div className="col-span-1 row-span-4 bg-yellow-400 h-">01</div>
          <div className="col-span-3 row-span-3 bg-green-400">02</div>
          <div className="col-span-3 row-span-1 bg-gray-400">03</div>
        </div>
        <div className="h-[100vh] w-[53px]  bg-yellow-600">
          <DashbordVerticalList/>
        </div>
      </div>
    </>
  );
}

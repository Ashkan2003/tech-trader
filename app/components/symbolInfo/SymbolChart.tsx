import { Symbols } from "@prisma/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    // name: "Page A",
    uv: 4000,
    // amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    amt: 2181,
  },
];

interface Props{
  datax:Symbols["chartNumber"]
}

const SymbolChart = ({datax}:Props) => {
  console.log(datax,"aaa")
  return (
    <div className="h-80">
      <ResponsiveContainer width="110%" height="100%">
        <LineChart
        
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 25,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="name" /> */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SymbolChart;

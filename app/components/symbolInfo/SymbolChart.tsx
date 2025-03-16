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


interface Props {
  data?: Symbols["chartNumber"];
}

const SymbolChart = ({ data}: Props) => {
  if(!data) return null
  // convert data to json
  const jsonData = JSON.stringify(data);
  // conver data from json to string
  const stringfyData = JSON.parse(jsonData);

  const chartData = stringfyData.map(
    (item: { date: string; price: number }) => {
      return { name: item.date, قیمت: item.price };
    }
  );

  return (
    <div className="h-80">
      <ResponsiveContainer width="110%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 25,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid  strokeDasharray="3 2" />
          <XAxis  dataKey="name" />
          <YAxis />
          <Tooltip  animationEasing="ease-out"/>
          {/* <Legend /> */}
          <Line type="monotone" dataKey="قیمت" stroke="#5cd91d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SymbolChart;

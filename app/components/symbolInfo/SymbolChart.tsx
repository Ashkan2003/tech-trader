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

const sampleData = [
  {
    name: "Page A",
    قیمت: 2400,
  },
  {
    name: "Page B",
    قیمت: 1398,
  },
  {
    name: "Page C",
    قیمت: 9800,
  },
  {
    name: "Page D",
    قیمت: 3908,
  },
  {
    name: "Page E",
    قیمت: 4800,
  },
  {
    name: "Page F",
    قیمت: 3800,
  },
  {
    name: "Page G",
    قیمت: 4300,
  },
];

interface Props {
  data?: Symbols["chartNumber"];
}

const SymbolChart = ({ data }: Props) => {
  let lineChartDate;
  if (data) {
    // convert data to json
    const jsonData = JSON.stringify(data);
    // conver data from json to string
    const stringfyData = JSON.parse(jsonData);

    const chartData = stringfyData.map(
      (item: { date: string; price: number }) => {
        return { name: item.date, قیمت: item.price };
      }
    );

    lineChartDate = chartData;
  } else {
    lineChartDate = sampleData;
  }
  console.log(lineChartDate, "pp");
  return (
    <div className="h-80">
      <ResponsiveContainer width="110%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={lineChartDate}
          margin={{
            top: 5,
            right: 25,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip animationEasing="ease-out" />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="قیمت" stroke="#5cd91d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SymbolChart;

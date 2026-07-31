import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import "./SalesChart.css";

function SalesChart({ data = [] }) {

  return (

    <div className="sales-chart-card">

      <div className="sales-chart-header">

        <h3>
          Ventas últimos 7 días
        </h3>

        <span>
          Resumen diario
        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#2563EB"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default SalesChart;
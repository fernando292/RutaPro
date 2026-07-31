import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

import "./OrdersStatusChart.css";

const COLORS = [
  "#2563EB",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6"
];

function OrdersStatusChart({ data = [] }) {

  return (

    <div className="orders-status-card">

      <div className="orders-status-header">

        <h3>

          Pedidos por estado

        </h3>

        <span>

          Distribución actual

        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie

            data={data}

            dataKey="value"

            nameKey="name"

            cx="50%"

            cy="50%"

            outerRadius={110}

            label

          >

            {

              data.map((entry, index) => (

                <Cell

                  key={index}

                  fill={COLORS[index % COLORS.length]}

                />

              ))

            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default OrdersStatusChart;
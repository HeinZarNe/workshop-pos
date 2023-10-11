import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { BaseColor } from "../../constant";
import { Loader } from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
export const options = {
  responsive: true,
};

export function DataLineChart({ data: core, state }) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      monthly: {
        data: core?.monthly?.map((item) => item.total_sales),
        label: core?.monthly?.map((item) => item.date),
      },
    }));

    setChartData((prev) => ({
      ...prev,
      yearly: {
        data: core?.yearly?.map((item) => item.monthSales),
        label: core?.yearly?.map((item) => item.monthName),
      },
    }));

    setChartData((prev) => ({
      ...prev,
      weekly: {
        data: core?.weekly?.map((item) => item.daySales),
        label: core?.weekly?.map((item) => item.dayName),
      },
    }));
  }, [core]);
  if (state === 1) {
    return (
      <Line
        options={options}
        data={{
          labels: chartData?.yearly?.label,
          datasets: [
            {
              label: "Datas",
              data: chartData?.yearly?.data,
              borderColor: BaseColor,
              backgroundColor: "#BB86FC",
            },
          ],
        }}
        style={{ color: "white " }}
      />
    );
  } else if (state === 2) {
    return (
      <Line
        options={options}
        data={{
          labels: chartData?.monthly?.label,
          datasets: [
            {
              label: "Datas",

              data: chartData?.monthly?.data,
              borderColor: BaseColor,
              backgroundColor: "#BB86FC",
            },
          ],
        }}
        style={{ color: "white " }}
      />
    );
  } else if (state === 3) {
    return (
      <Line
        options={options}
        data={{
          labels: chartData?.weekly?.label,
          datasets: [
            {
              label: "Datas",
              data: chartData?.weekly?.data,
              borderColor: BaseColor,
              backgroundColor: "#BB86FC",
            },
          ],
        }}
        style={{ color: "white " }}
      />
    );
  } else {
    <div></div>;
  }
}

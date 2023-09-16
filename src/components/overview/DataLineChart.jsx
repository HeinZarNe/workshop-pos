import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      data: [-131, 512, -655, 626, -917, 63, -872, -894, 849, 976, -227],
      borderColor: BaseColor,
      backgroundColor: "#ddbf9a",
    },
  ],
};

console.log(labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })));
export function DataLineChart() {
  return <Line options={options} data={data} />;
}

import { Chart } from "primereact/chart";
import React, { useState, useEffect } from "react";

const BarChart = () => {
  useEffect(() => {
    const data = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          data: [300, 325, 202, 120, 300, 280, 100],
          backgroundColor: ["#B19177"],
          label: "Sales",
        },
      ],
    };
    const options = {
      maintainAspectRatio: true,
      aspectRatio: 1.3,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, []);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  return (
    <div className="w-full">
      <div className="card ">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BarChart;

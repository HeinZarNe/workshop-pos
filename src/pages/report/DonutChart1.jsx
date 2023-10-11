import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const DonutChart1 = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      //   labels: ["emlo", "City", "Pro","Dutch"],
      datasets: [
        {
          data: [300, 50, 100, 70],
          backgroundColor: ["#660066", "#BE29EC", "#EFBBFF", "#E53F71"],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex  justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full mx-auto"
      />
    </div>
  );
};

export default DonutChart1;

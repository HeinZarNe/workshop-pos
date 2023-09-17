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
          backgroundColor: ["#884A39", "#C38154", "#FFC26F", "#F9E0BB"],
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

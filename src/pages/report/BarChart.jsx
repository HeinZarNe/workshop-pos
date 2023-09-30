import { Chart } from "primereact/chart";
import React, { useState, useEffect } from "react";
import { useWeeklySaleQuery } from "../../services/authApi";
const BarChart = () => {
  const token = localStorage.getItem("token");
  const [urlLink, setUrlLink] = useState("weekly-report");
  // console.log(sale?.weeklySales[0]?.daySales);
  const { data: sale } = useWeeklySaleQuery({ token, urlLink });
  useEffect(() => {
    const mon = sale?.weeklySales[0]?.daySales;
    const tue = sale?.weeklySales[1]?.daySales;
    const wed = sale?.weeklySales[2]?.daySales;
    const thu = sale?.weeklySales[3]?.daySales;
    const fri = sale?.weeklySales[4]?.daySales;
    const sat = sale?.weeklySales[5]?.daySales;
    const sun = sale?.weeklySales[6]?.daySales;
    console.log(mon);

    const data = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          data: [sun, mon, tue, wed, thu, fri, sat],
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
    console.log(data, options);
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

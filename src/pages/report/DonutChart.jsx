import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useGetBrandReportQuery } from "../../services/authApi";
const DonutChart = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const { data: ch } = useGetBrandReportQuery(localStorage.getItem("token"));
  // console.log(ch?.brandsInfo[0].count);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      //   labels: ["emlo", "City", "Pro","Dutch"],
      datasets: [
        {
          data: [
            ch?.brandsInfo[0].count,
            ch?.brandsInfo[1].count,
            ch?.brandsInfo[2].count,
            ch?.brandsInfo[3].count,
          ],

          backgroundColor: ["#660066", "#BE29EC", "#EFBBFF", "#E53F71"],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, [ch]);

  return (
    <div className="card flex  justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-[250px] mx-auto"
      />
    </div>
  );
};

export default DonutChart;

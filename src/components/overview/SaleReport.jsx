import React, { useEffect, useState } from "react";
import { DataLineChart } from "./DataLineChart";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiCoinsBold } from "react-icons/pi";
import { AiOutlineShop } from "react-icons/ai";
import {
  useGetDailySalesQuery,
  useGetMonthlySalesQuery,
  useGetYearlySalesQuery,
} from "../../services/authApi";
import { BaseColor } from "./../../constant";
function SaleReport() {
  const ContentBoxClass = " p-4 border-[#535353] rounded-md border-[1px]";
  const [chartState, setChartState] = useState(2);
  const [chartData, setChartData] = useState(2);
  const token = localStorage.getItem("token");
  const monthlyData = useGetMonthlySalesQuery(token);
  const yearlyData = useGetYearlySalesQuery(token);
  const dailyData = useGetDailySalesQuery(token);
  useEffect(() => {
    if (monthlyData || yearlyData || dailyData) {
      switch (chartState) {
        case 1:
          setChartData(yearlyData);
          break;
        case 2:
          setChartData(monthlyData);
          break;
        case 3:
          setChartData(dailyData);
          break;
      }
    }

    return () => {};
  }, [monthlyData, yearlyData, dailyData]);

  const handleChartState = (option) => {
    setChartState(option);
  };
  return (
    <div className={ContentBoxClass + " flex flex-row gap-7"}>
      <div className="flex flex-col gap-5 flex-[2]">
        <div className="flex flex-row gap-2 items-center justify-between">
          <p className="text-2xl text-white">
            {chartState === 1 && "Yearly"}
            {chartState === 2 && "Monthly"}
            {chartState === 3 && "Daily"} Sales
          </p>
          <div className="flex flex-row">
            <div
              data-saleAction="true"
              style={{ color: chartState == 1 && BaseColor }}
              onClick={(_) => handleChartState(1)}
            >
              Year
            </div>
            <div
              data-saleAction="true"
              style={{ color: chartState == 2 && BaseColor }}
              onClick={(_) => handleChartState(2)}
            >
              Month
            </div>
            <div
              data-saleAction="true"
              style={{ color: chartState == 3 && BaseColor }}
              onClick={(_) => handleChartState(3)}
            >
              Day
            </div>
          </div>
        </div>
        <DataLineChart />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-col">
          <p className="text-3xl text-white">454.44k</p>
          <p className="text-xl font-thin">Kyats</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="bg-[#383838] rounded-[5px] p-[12px]">
            <BsGraphUpArrow color="#75ff31" />
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-white">454.443</p>
            <p>Total Profit</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <div className="bg-[#383838] rounded-[5px] p-[12px]">
            <PiCoinsBold color="#f2ff45" />
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-white">435.84</p>
            <p>Total Income</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="bg-[#383838] rounded-[5px] p-[12px]">
            <AiOutlineShop color="#d1b694" />
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-white">983.43</p>
            <p>Total Expense</p>
          </div>
        </div>
        <div className="bg-[#b19177] cursor-pointer text-black rounded-lg text-center py-2 px-4 font-semibold tracking-wider">
          SALE REPORT
        </div>
      </div>
    </div>
  );
}

export default SaleReport;

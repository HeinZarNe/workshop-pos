import React, { useEffect, useState } from "react";
import { DataLineChart } from "./DataLineChart";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiCoinsBold } from "react-icons/pi";
import { AiOutlineShop } from "react-icons/ai";
import {
  useGetDailySalesQuery,
  useGetMonthlyOverviewQuery,
  useGetMonthlySalesQuery,
  useGetWeeklyOverviewQuery,
  useGetYearlyOverviewQuery,
  useGetYearlySalesQuery,
} from "../../services/authApi";
import { BaseColor } from "./../../constant";
import Yearly from "./../../pages/finance/Yearly";
import { Loader } from "@mantine/core";
import { Link } from "react-router-dom";

function SaleReport() {
  const ContentBoxClass = " p-4 border-[#E9E9E950] rounded-md border-[1px]";
  const [chartState, setChartState] = useState(2);
  const token = localStorage.getItem("token");

  const { data: monthlyData, isLoading: monthlyLoading } =
    useGetMonthlyOverviewQuery({ token });
  const { data: weeklyData, isLoading: weeklyLoading } =
    useGetWeeklyOverviewQuery({ token });
  const { data: yearlyData, isLoading: yearlyLoading } =
    useGetYearlyOverviewQuery({ token });

  const handleChartState = (option) => {
    setChartState(option);
  };
  if (monthlyLoading || weeklyLoading) {
    return (
      <div
        className={
          ContentBoxClass +
          " flex flex-row gap-7 items-center justify-center min-h-[400px]"
        }
      >
        <Loader variant="bars" color="#bb86fc" />
      </div>
    );
  }

  return (
    <div className={ContentBoxClass + " flex flex-row gap-7"}>
      <div className="flex flex-col gap-5 flex-[2] text-tcolor">
        <div className="flex flex-row gap-2 items-center justify-between">
          <p className="text-2xl text-tcolor">
            {chartState === 1 && "Yearly"}
            {chartState === 2 && "Monthly"}
            {chartState === 3 && "Weekly"} Sales
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
              Week
            </div>
          </div>
        </div>
        <DataLineChart
          data={{
            yearly: yearlyData?.yearlySaleOverview?.yearlySales,
            monthly: monthlyData?.monthlySaleOverview?.monthlySales,
            weekly: weeklyData?.weeklySaleOverview?.weeklySales,
          }}
          state={chartState}
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 justify-between">
        <div className="flex flex-col">
          <p className="text-3xl text-tcolor">
            {" "}
            {chartState === 1 && yearlyData?.totalIncome}
            {chartState === 2 && monthlyData?.totalIncome}
            {chartState === 3 && weeklyData?.totalIncome}
          </p>
          <p className="text-xl font-thin">Kyats</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="bg-[#1e1e1e] rounded-[5px] p-[12px]">
            <BsGraphUpArrow color="#75ff31" />
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-tcolor">
              {" "}
              {chartState === 1 && yearlyData?.totalProfit}
              {chartState === 2 && monthlyData?.totalProfit}
              {chartState === 3 && weeklyData?.totalProfit}
            </p>
            <p>Total Profit</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <div className="bg-[#1e1e1e] rounded-[5px] p-[12px]">
            <PiCoinsBold color="#f2ff45" />
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-tcolor">
              {" "}
              {chartState === 1 && yearlyData?.totalIncome}
              {chartState === 2 && monthlyData?.totalIncome}
              {chartState === 3 && weeklyData?.totalIncome}
            </p>
            <p>Total Income</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="bg-[#1e1e1e] rounded-[5px] p-[12px]">
            <AiOutlineShop color="#d1b694" />
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-tcolor">
              {" "}
              {chartState === 1 && yearlyData?.totalExpenses}
              {chartState === 2 && monthlyData?.totalExpenses}
              {chartState === 3 && weeklyData?.totalExpenses}
            </p>
            <p>Total Expense</p>
          </div>
        </div>
        <Link to="sale-report">
          <div className="bg-primary cursor-pointer text-secondary rounded-lg text-center py-2 px-4 font-semibold tracking-wider">
            SALE REPORT
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SaleReport;

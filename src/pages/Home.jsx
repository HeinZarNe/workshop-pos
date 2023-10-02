import React, { useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import {
  BsCart3,
  BsFillPersonBadgeFill,
  BsGraphUpArrow,
  BsPlus,
} from "react-icons/bs";
import { AiOutlineArrowRight, AiOutlineShop } from "react-icons/ai";
import { PiCoinsBold } from "react-icons/pi";
import { BaseColor } from "../constant";
import { DataLineChart } from "../components/overview/DataLineChart";
import SaleReport from "../components/overview/SaleReport";
import TodaySaleOverview from "../components/overview/TodaySaleOverview";
import {
  useGetMonthlyOverviewQuery,
  useGetOverviewDataQuery,
  useGetWeeklyOverviewQuery,
  useGetYearlyOverviewQuery,
} from "../services/authApi";
import { Link } from "react-router-dom";

// {
//   "monthlySaleOverview": {
//       "monthlySales": [
//           {
//               "date": "01\/09\/2023",
//               "total_sales": 13443
//           },
//           {
//               "date": "02\/09\/2023",
//               "total_sales": 23613
//           },
//           {
//               "date": "03\/09\/2023",
//               "total_sales": 8304
//           },
//           {
//               "date": "04\/09\/2023",
//               "total_sales": 14464
//           },
//           {
//               "date": "05\/09\/2023",
//               "total_sales": 24968
//           },
//           {
//               "date": "06\/09\/2023",
//               "total_sales": 15331
//           },
//           {
//               "date": "07\/09\/2023",
//               "total_sales": 21528
//           },
//           {
//               "date": "08\/09\/2023",
//               "total_sales": 21411
//           },
//           {
//               "date": "09\/09\/2023",
//               "total_sales": 21430
//           },
//           {
//               "date": "10\/09\/2023",
//               "total_sales": 18816
//           },
//
//       ],
//       "totalMonthlySalesAmount": 474215,
//       "averageAmount": 16936.25,
//       "highestSale": {
//           "highestSaleAmount": 24968,
//           "highestSellingDateOfMonth": "05\/09\/2023"
//       },
//       "lowestSale": {
//           "lowestSaleAmount": 8166,
//           "lowestSellingDateOfMonth": "12\/09\/2023"
//       }
//   },
//   "totalProfit": 286179,
//   "totalIncome": 515071,
//   "totalExpenses": 228892
// }

const Home = () => {
  const ContentBoxClass = " p-4 border-[#535353] rounded-md border-[1px]";
  const token = localStorage.getItem("token");
  const { data } = useGetOverviewDataQuery({ token });

  return (
    <Rootlayout>
      <div className="p-5 flex flex-col gap-5 overview">
        {/* Header */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl text-[#B19777]">Overview</h1>
          <p className="text-white">Overview / Products</p>
        </div>
        {/* First Section */}
        <div
          className={
            " flex flex-row items-stretch gap-3 justify-between  flex-wrap"
          }
        >
          {/* Stock */}
          <div
            className={
              " flex flex-row items-center justify-center gap-2 flex-1 " +
              ContentBoxClass
            }
          >
            <div className=" rounded-full bg-[#202020] p-3">
              <div className=" rounded-full bg-[#262626] p-4 border-[1px] border-base">
                <BsCart3 size={28} color={BaseColor} />
              </div>
            </div>
            <div className="flex flex-col items-end min-w-[100px]">
              <p className="text-2xl font-semibold text-white ">
                {data?.total_stock || "--"}
              </p>
              <p>Total stocks</p>
            </div>
          </div>
          {/* Stuff  */}
          <div
            className={
              "flex flex-row items-center justify-center gap-2 flex-1 " +
              ContentBoxClass
            }
          >
            <div className=" rounded-full bg-[#202020] p-3">
              <div className=" rounded-full bg-[#262626] p-4 border-[1px] border-base">
                <BsFillPersonBadgeFill size={26} color={BaseColor} />
              </div>
            </div>
            <div className="flex flex-col items-end min-w-[100px]">
              <p className="text-2xl font-semibold text-white  ">
                {data?.total_staff || "--"}
              </p>
              <p>Total Staff</p>
            </div>
          </div>
          {/* Quick Actions */}
          <div className={ContentBoxClass + " flex flex-col  gap-3 flex-[4] "}>
            <p className="text-lg   text-white">Quick Actions</p>
            <div className="flex flex-row items-stretch gap-2 ">
              <div
                className={
                  ContentBoxClass +
                  " flex flex-row gap-5 items-center justify-between"
                }
              >
                <Link to={"/products/create"}>
                  <div
                    className={
                      "border-[#535353] rounded-md border-[1px] flex flex-row items-center justify-between px-2 py-2"
                    }
                  >
                    <BsPlus
                      size={35}
                      color={BaseColor}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </Link>

                <div>
                  <p className="text-lg text-white">Add Product</p>
                  <p className="text-sm">stock update</p>
                </div>
              </div>
              <div
                className={
                  ContentBoxClass + " flex flex-row items-center gap-10"
                }
              >
                <div className=" flex flex-row items-center  gap-3">
                  <div
                    className={
                      "border-[#535353] rounded-md border-[1px] flex flex-row items-center justify-between px-2 py-2"
                    }
                  >
                    <AiOutlineShop size={30} color={BaseColor} />
                  </div>

                  <div>
                    <p className="text-lg text-white">Go to Shop</p>
                    <p className="text-sm">complete the sale</p>
                  </div>
                </div>
                <Link to={"/products"}>
                  <div className=" rounded-full p-2 bg-base bg-opacity-5">
                    <AiOutlineArrowRight
                      size={20}
                      color={BaseColor}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Second Section */}
        <SaleReport />
        {/* Third Section */}
        {data?.today_sales?.data.length > 0 && <TodaySaleOverview />}
      </div>
    </Rootlayout>
  );
};

export default Home;

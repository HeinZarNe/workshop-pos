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
import { useGetStockQuery } from "../services/authApi";

const Home = () => {
  const ContentBoxClass = " p-4 border-[#535353] rounded-md border-[1px]";
  const token = localStorage.getItem("token");
  const stocks = useGetStockQuery(token);
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
              <p className="text-2xl font-semibold text-white ">2,500 k</p>
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
              <p className="text-2xl font-semibold text-white  ">645</p>
              <p>Total Stuff</p>
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
                <div className=" rounded-full p-2 bg-base bg-opacity-5">
                  <AiOutlineArrowRight
                    size={20}
                    color={BaseColor}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Second Section */}
        <SaleReport />
        {/* Third Section */}
        <TodaySaleOverview />
        <div></div>
        {/* Fourth Section */}

        <div></div>
      </div>
    </Rootlayout>
  );
};

export default Home;

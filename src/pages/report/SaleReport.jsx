import React from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link } from "react-router-dom";
import { BsClipboard2Pulse, BsThreeDotsVertical } from "react-icons/bs";
import { HiArrowSmallUp } from "react-icons/hi2";
import Chart from "./BarChart";

const SaleReport = () => {
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        {/* first  */}
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-white">
              Sale
            </h1>
            <p className=" text-gray-400">Report/ Sale</p>
          </div>
          <div className=" flex gap-3">
            <div className="grid grid-cols-3 text-base border divide-base divide-x text-center border-base rounded-md">
              <p className="p-3 px-4 text-xl font-semibold">Year</p>
              <p className="p-3 px-4 text-xl text-white font-semibold">Month</p>
              <p className="p-3 px-4 text-xl font-semibold">Week</p>
            </div>
          </div>
        </div>
        {/* second  */}
        <div className="grid grid-cols-12  mt-5 gap-4">
          <div className="col-span-4 border border-secondary rounded-lg p-4">
            <div className="flex mb-4 items-center justify-between">
              <p className="text-2xl">Today Sales</p>
              <BsThreeDotsVertical className="text-xl" />
            </div>
            <h1 className="text-5xl text-white">928,500</h1>
            <p className="text-sm ms-1 mt-1">Kyats</p>
            <div className="mt-4">
              <div className="flex border-t border-secondary py-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <BsClipboard2Pulse className="text-base" />{" "}
                  <p className="text-lg">09038</p>
                </div>
                <div className="flex gap-7">
                  <p className="text-lg">934k</p>
                  <div className="text-lg flex items-center">
                    85% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                  </div>
                </div>
              </div>
              <div className="flex border-t border-secondary py-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <BsClipboard2Pulse className="text-base" />{" "}
                  <p className="text-lg">09038</p>
                </div>
                <div className="flex gap-7">
                  <p className="text-lg">934k</p>
                  <div className="text-lg flex items-center">
                    85% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                  </div>
                </div>
              </div>
              <div className="flex border-t border-secondary py-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <BsClipboard2Pulse className="text-base" />{" "}
                  <p className="text-lg">09038</p>
                </div>
                <div className="flex gap-7">
                  <p className="text-lg">934k</p>
                  <div className="text-lg flex items-center">
                    85% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-lg font-semibold p-2 px-3 border rounded-lg mt-3 border-[#fafafa] text-[#fafafa] hover:bg-base hover:text-black duration-100 ">
                RECENT SALES
              </button>
            </div>
          </div>
          <div className="col-span-8 p-4 border border-secondary rounded-lg ">
            <div className="">
                <h1 className="text-2xl text-[#fafafa]">Weekly Sales</h1>
                <p className="">Total 85.4k Sales</p>
            </div>
            <Chart/>
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default SaleReport;

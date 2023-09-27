import React from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { BsClipboard2Pulse, BsThreeDotsVertical } from "react-icons/bs";
import { HiArrowSmallUp } from "react-icons/hi2";
// import Chart from "./BarChart";
// import Text from "./Text";
import { AiOutlineArrowRight } from "react-icons/ai";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import { useGetBrandReportQuery } from "../../services/authApi";

const SaleReport = () => {
  const item = useGetBrandReportQuery(localStorage.getItem("token"));
  console.log(item);
  const tableData = [
    {
      id: 1,
      no: 3,
      name: "acer",
      brand: "acer",
      sale: 1000,
      btn: (
        <button className="flex items-center justify-center w-7 h-7 rounded-full bg-base text-black">
          <AiOutlineArrowRight />
        </button>
      ),
    },
    {
      id: 2,
      no: 3,
      name: "acer",
      brand: "acer",
      sale: 1000,
      btn: (
        <button className="flex items-center justify-center w-7 h-7 rounded-full bg-base text-black">
          <AiOutlineArrowRight />
        </button>
      ),
    },
    {
      id: 3,
      no: 3,
      name: "acer",
      brand: "acer",
      sale: 1000,
      btn: (
        <button className="flex items-center justify-center w-7 h-7 rounded-full bg-base text-black">
          <AiOutlineArrowRight />
        </button>
      ),
    },
    {
      id: 4,
      no: 3,
      name: "acer",
      brand: "acer",
      sale: 1000,
      btn: (
        <button className="flex items-center justify-center w-7 h-7 rounded-full bg-base text-black">
          <AiOutlineArrowRight />
        </button>
      ),
    },
  ];
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
            <div className="flex mb-3 items-center justify-between">
              <p className="text-2xl text-white">Today Sales</p>
              <BsThreeDotsVertical className="text-xl" />
            </div>
            <h1 className="text-5xl font-semibold text-white">928,500</h1>
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
          <div className="col-span-8 p-4 border  border-secondary rounded-lg ">
            <div className="">
              <h1 className="text-2xl text-[#fafafa]">Weekly Sales</h1>
              <p className="">Total 85.4k Sales</p>
            </div>
            <div className=" grid grid-cols-2 mt-4">
              <div className="hidden">
                <BarChart className="w-full hidden" />
              </div>
              <BarChart className="w-full" />
              {/* <Text/> */}
              <div className=" p-4">
                <div className="flex mb-5 items-center">
                  <p className="h-10 mt-1 w-11 text-xl flex justify-center items-center border border-secondary rounded-md">
                    T
                  </p>
                  <div className="flex items-center w-full px-4 justify-between">
                    <div className="flex items-start">
                      <div className="flex flex-col">
                        <p className="text-md text-white font-semibold">
                          Highest
                        </p>
                        <p className="text-sm">12/8/2023</p>
                      </div>
                      <p className="flex items-center text-green-500">
                        {" "}
                        <HiArrowSmallUp className="mx-1 " /> 25%
                      </p>
                    </div>
                    <div className="flex items-end flex-col">
                      <p className="text-md text-white font-semibold">125k</p>
                      <p className="text-sm">Kyats</p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-5 items-center">
                  <p className="h-10 mt-1 w-11 text-xl flex justify-center items-center border border-secondary rounded-md">
                    T
                  </p>
                  <div className="flex items-center w-full px-4 justify-between">
                    <div className="flex items-start">
                      <div className="flex flex-col">
                        <p className="text-md text-white font-semibold">
                          Average
                        </p>
                        <p className="text-sm">Income</p>
                      </div>
                      {/* <p className="flex items-center text-green-500">
                        {" "}
                        <HiArrowSmallUp className="mx-1 " /> 25%
                      </p> */}
                    </div>
                    <div className="flex items-end flex-col">
                      <p className="text-md text-white font-semibold">100k</p>
                      <p className="text-sm">Kyats</p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-5  items-center">
                  <p className="h-10 mt-1 w-11 text-xl flex justify-center items-center border border-secondary rounded-md">
                    T
                  </p>
                  <div className="flex items-center w-full px-4 justify-between">
                    <div className="flex items-start">
                      <div className="flex flex-col">
                        <p className="text-md text-white font-semibold">
                          Lowest
                        </p>
                        <p className="text-sm">12/8/2023</p>
                      </div>
                      <p className="flex items-center text-red-500">
                        {" "}
                        <HiArrowSmallUp className="mx-1 rotate-180 " /> 25%
                      </p>
                    </div>
                    <div className="flex items-end flex-col">
                      <p className="text-md text-white font-semibold">97k</p>
                      <p className="text-sm ">Kyats</p>
                    </div>
                  </div>
                </div>
                <button className="btn block ms-auto btn-outline hover:bg-base hover:border-0 px-5 text-base border-base">
                  SEE MORE
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* third */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="text-3xl text-white font-semibold mb-4 ms-2 mt-10">
              Product Sales
            </div>
            <div className=" border-2 rounded-t-lg border-base">
              <div className="relative overflow-x-auto shadow-md sm:rounded-md">
                <table className="w-full text-sm text-left text-[#fafafa] ">
                  <thead className="text-xs text-gray-900 uppercase bg-base">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        NO
                      </th>
                      <th scope="col" className="px-6 py-3">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        BRAND
                      </th>
                      <th scope="col" className="px-6 text-end py-3">
                        SALE PRICE
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.map((data) => {
                      return (
                        <tr
                          key={data.id}
                          className=" border-b hover:bg-white/10 "
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-white whitespace-nowra"
                          >
                            {data.no}
                          </th>
                          <td className="px-6 py-4">{data.name}</td>
                          <td className="px-6 py-4">{data.brand}</td>
                          <td className="px-6 py-4  text-end">{data.sale}</td>
                          <td className="px-6 py-4 text-right">
                            <NavLink
                              to={"/profile"}
                              className="font-medium flex ps-5 justify-center text-blue-600  hover:underline"
                            >
                              {data.btn}
                            </NavLink>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-3xl text-white font-semibold mb-4 ms-2 mt-10">
              Brand Sales
            </div>
            <div className="border-2 border-base p-4 rounded-md">
              <DonutChart />
              <div className="flex w-[85%] mx-auto mt-3 justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#884A39] mt-1 rounded-full"></div>
                  melo
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#C38154] mt-1 rounded-full"></div>
                  city
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#FFC26F] mt-1 rounded-full"></div>
                  pro
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#F9E0BB] mt-1 rounded-full"></div>
                  dutch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default SaleReport;

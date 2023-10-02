import React, { useEffect, useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { PiExportBold, PiFilePdf } from "react-icons/pi";
import DatePicker from "../../components/DatePicker";
import { FiCopy, FiSearch } from "react-icons/fi";
import { BiPrinter } from "react-icons/bi";
import { Loader, Pagination } from "@mantine/core";

import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import { useGetDailySalesQuery } from "../../services/authApi";
const Daily = () => {
  const [page, setPage] = useState(1);
  const [dateSearch, setDateSearch] = useState(false);
  const token = localStorage.getItem("token");
  const [date, setDate] = useState(null);
  const {
    data: dailySalesData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetDailySalesQuery({
    page,
    token,
    date: dateSearch ? { from, to } : false,
  });
  console.log(dailySalesData);
  const handleDateSearch = () => {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const day = String(inputDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDateSearch(formattedDate);
  };
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        {/* top */}
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-white">
              Daily
            </h1>
            <p className=" text-gray-400">Finance/ Daily</p>
          </div>
          <div className=" flex gap-3">
            {/* <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 rounded-lg text-white border border-[#FFFFFF] hover:bg-[#B19777]">
                {" "}
                Go To Shop
              </button>
            </Link> */}
            <Link to={"/products"}>
              <button className=" px-4 py-2 mt-1 text-black rounded-lg flex items-center  button">
                Go To Shop
              </button>
            </Link>
          </div>
        </div>
        {/* second */}
        <div className="flex mt-12 flex-row items-center  justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold mt-0 pt-0 text-white">
              Today Sales Overview
            </p>
          </div>
          {/* <NavLink to={"/sale/cashier"}>
            <button className="bg-base py-2 px-4 mt-1 text-white rounded-md font-semibold">
              Go to Shop
            </button>
          </NavLink> */}
          <div className="flex gap-3">
            <div className="flex   gap-1 flex-row items-end justify-center">
              <DatePicker date={date} setDate={setDate} />
              {date && (
                <>
                  <div
                    className=" cursor-pointer flex text-black items-center justify-center font-semibold text-xl p-2 pe-3 rounded-e-sm bg-base h-10"
                    onClick={handleDateSearch}
                  >
                    <FiSearch />
                  </div>
                  <div
                    className=" cursor-pointer flex text-black items-center justify-center font-semibold text-xl p-2 pe-3 rounded-e-sm bg-base h-10"
                    onClick={(_) => {
                      setDate(null);
                      setDateSearch(false);
                    }}
                  >
                    <AiOutlineClose />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* table  */}
        <div className=" border-2 rounded-t-xl border-base mt-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-[#fafafa] ">
              <thead className="text-xs text-gray-900 uppercase bg-base">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    NO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    VOUNCHER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TIME
                  </th>
                  <th scope="col" className="px-6 text-end py-3">
                    ITEM COUNT
                  </th>
                  <th scope="col" className="px-6  text-end py-3">
                    CASH
                  </th>
                  <th scope="col" className="px-6  text-end py-3">
                    TAX
                  </th>
                  <th scope="col" className="px-6  text-end py-3">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailySalesData?.daily_sales?.data?.map((data) => {
                  return (
                    <tr key={data.id} className=" border-b hover:bg-white/10 ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowra"
                      >
                        {data.id}
                      </th>
                      <td className="px-6 py-4">
                        {data.voucher_number.slice(0, 15)}
                      </td>
                      <td className="px-6 py-4">{data.time}</td>
                      <td className="px-6 py-4  text-end">{data.item_count}</td>
                      <td className="px-6 py-4  text-end">{data.cash}</td>
                      <td className="px-6 py-4  text-end">{data.tax}</td>
                      <td className="px-6 py-4  text-end">{data.total}</td>
                      <td className="px-6 py-4 text-right">
                        <NavLink
                          to={"/profile"}
                          className="font-medium flex justify-center text-blue-600  hover:underline"
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
        {/* last  */}
        <div className="">
          {dailySalesData && (
            <div className="flex flex-row items-center justify-between bottom-section mt-10 ">
              <div className="flex flex-row items-center border rounded">
                <div className="flex flex-col items-end border-r px-6 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {dailySalesData.total_vouchers}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r py-2 px-6  border-white">
                  <p className="text-sm text-base">Total Cash</p>
                  <p className="text-xl font-bold text-white">
                    {dailySalesData.total_cash}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-6 py-2  border-white">
                  <p className="text-sm text-base">Total Tax</p>
                  <p className="text-xl font-bold text-white">
                    {dailySalesData.total_tax}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-6 py-2  border-white">
                  <p className="text-sm text-base">Total</p>
                  <p className="text-xl font-bold text-white">
                    {dailySalesData.total}
                  </p>
                </div>
              </div>
              <Pagination
                total={dailySalesData?.daily_sales?.last_page}
                onChange={(e) => {
                  console.log(e);
                  setPage(e);
                  refetch();
                }}
                boundaries={1}
                defaultValue={1}
              />
            </div>
          )}
        </div>
      </div>
    </Rootlayout>
  );
};

export default Daily;

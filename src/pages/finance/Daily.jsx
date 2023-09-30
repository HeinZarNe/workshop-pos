import React, { useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { PiExportBold, PiFilePdf } from "react-icons/pi";
import DatePicker from "../../components/DatePicker";
import { FiCopy, FiSearch } from "react-icons/fi";
import { BiPrinter } from "react-icons/bi";
import { Loader, Pagination } from "@mantine/core";

import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetDailySalesQuery } from "../../services/authApi";
const Daily = () => {
  const [page, setPage] = useState("");
  const token = localStorage.getItem("token");

  const {
    data: dailySalesData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetDailySalesQuery(token);
console.log(dailySalesData);
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
        <div className="flex mt-12 flex-row justify-between">
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
            <div className="">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className=" border border-secondary focus:border-base gap-2 text-gray-400 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center "
                type="button"
              >
                <PiExportBold className="text-lg text-base" /> Export
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdown"
                className="z-10 hidden bg-[#fafafa] text-base  divide-y divide-gray-100  shadow w-36 "
              >
                <ul
                  className="bg-opacity-20"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      className=" flex px-4 border border-base py-2 items-center gap-2"
                    >
                      <PiFilePdf className="text-xl text-base" /> PDF
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className=" flex px-4 border border-base py-2 items-center gap-2"
                    >
                      <BiPrinter className="text-xl text-base" /> Print
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className=" flex px-4 border border-base py-2 items-center gap-2"
                    >
                      <FiCopy className="text-xl text-base" /> Copy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex">
              <DatePicker />
              <div className="flex text-black items-center justify-center font-semibold text-xl p-2 pe-3 rounded-e-sm bg-base">
                <FiSearch />
              </div>
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
                {dailySalesData?.daily_sales.map((data) => {
                  return (
                    <tr key={data.id} className=" border-b hover:bg-white/10 ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowra"
                      >
                        {data.id}
                      </th>
                      <td className="px-6 py-4">{data.voucher_number}</td>
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
              {/* <Pagination
              value={activePage}
              onChange={setPage}
              total={5}
              siblings={1}
            /> */}
              {/* <nav aria-label="Page navigation example">
              <ul className="flex items-center bg-transparent -space-x-px h-8 text-sm">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-white border border-base rounded-l-lg hover:text-base "
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-white border border-base"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-base  border border-base hover:text-base "
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-white   border border-base hover:text-base "
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-white border border-base rounded-r-lg hover:text-base "
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav> */}
              {/* <Pagination
              total={dailySalesData?.meta?.last_page}
              onChange={(e) => {
                setPage(e);
                refetch();
              }}
              onPreviousPage={(e) => {
                setPage(page - 1);
                refetch();
              }}
              onNextPage={(e) => {
                setPage(page + 1);
                refetch();
              }}
              boundaries={1}
              defaultValue={1}
              on
            /> */}

              {/* other  */}
              {/* <Pagination
                total={totalPage || 1}
                onChange={(e) => {
                  setPage(e);
                  refetch();
                }}
                // onPreviousPage={(e) => {
                //   setPage((prev) => prev > 0 && prev - 1);
                //   refetch();
                // }}
                // onNextPage={(e) => {

                //   refetch();
                // }}
                boundaries={1}
                defaultValue={1}
              /> */}
            </div>
          )}
        </div>
      </div>
    </Rootlayout>
  );
};

export default Daily;

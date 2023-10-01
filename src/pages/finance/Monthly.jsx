import React, { useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { PiExportBold, PiFilePdf } from "react-icons/pi";
import DatePicker from "../../components/DatePicker";
import { FiCopy, FiSearch } from "react-icons/fi";
import { BiPrinter, BiSolidCalendarWeek } from "react-icons/bi";
import { Pagination } from "@mantine/core";

import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetMonthlySalesQuery } from "../../services/authApi";
const Monthly = () => {
  const token = localStorage.getItem("token");
  const { data: monthlySaleData } = useGetMonthlySalesQuery(token);
  // console.log(monthlySaleData.this_month_sales);

  const [activePage, setPage] = useState(1);
  const date = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = [2023, 2022, 2021, 2020, 2019, 2018];

  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        {/* top */}
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-white">
              Monthly
            </h1>
            <p className=" text-gray-400">Finance/ Monthly</p>
          </div>
          <div className=" flex gap-3">
            {/* <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 rounded-lg text-white border border-[#FFFFFF] hover:bg-[#B19777]">
                {" "}
                Go To Shop
              </button>
            </Link> */}
            <Link to={"/products/create"}>
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
              This Month Sales Overview
            </p>
          </div>
          {/* ... */}
          <div className="flex gap-4">
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
                <ul className="" aria-labelledby="dropdownDefaultButton">
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
              {/* second menu  */}
              <select
                id="countries"
                className=" border w-28 border-white/20 text-white/50 bg-transparent text-sm rounded- focus:ring-base focus:border-base block  p-2.5  dark:placeholder-gray-400"
              >
                <option className="text-base" selected>
                  January
                </option>
                <option className="text-base" value="feb">
                  February
                </option>
                <option className="text-base" value="mar">
                  March
                </option>
                <option className="text-base" value="apr">
                  April
                </option>
                <option className="text-base" value="may">
                  May
                </option>
                <option className="text-base" value="jun">
                  June
                </option>
                <option className="text-base" value="jul">
                  July
                </option>
                <option className="text-base" value="aug">
                  August
                </option>
                <option className="text-base" value="sep">
                  September
                </option>
                <option className="text-base" value="oct">
                  October
                </option>
                <option className="text-base" value="nov">
                  November
                </option>
                <option className="text-base" value="dec">
                  December
                </option>
              </select>
              {/* first menu  */}{" "}
              <select
                id="countries"
                className=" border w-20 border-white/20 text-white/50 bg-transparent text-sm rounded-sm focus:ring-base focus:border-base block  p-2.5  dark:placeholder-gray-400 "
              >
                <option className="text-base" selected>
                  2023
                </option>
                <option className="text-base" value="22">
                  2022
                </option>
                <option className="text-base" value="21">
                  2021
                </option>
                <option className="text-base" value="20">
                  2020
                </option>
                <option className="text-base" value="19">
                  2019
                </option>
              </select>
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
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    VOUCHERS
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
                {monthlySaleData?.this_month_sales?.data?.map((data) => {
                  return (
                    <tr key={data.id} className=" border-b hover:bg-white/10 ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowra"
                      >
                        {data.id}
                      </th>
                      <td className="px-6 py-4">{data.date}</td>
                      <td className="px-6 py-4">{data.vouchers}</td>
                      <td className="px-6 py-4  text-end">{data.cash}</td>
                      <td className="px-6 py-4  text-end">{data.tax}</td>
                      <td className="px-6 py-4  text-end">{data.total}</td>
                      <td className="px-6 py-4 text-center">
                        <NavLink
                          to={"/profile"}
                          className="font-medium flex justify-center text-blue-600  hover:underline"
                        >
                          <button className="flex items-center mx-auto justify-center w-7 h-7 rounded-full bg-base text-black">
                            <AiOutlineArrowRight />
                          </button>
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
        {monthlySaleData && (
          <div className="">
            <div className="flex flex-row items-center justify-between bottom-section mt-10 ">
              <div className="flex flex-row items-center border rounded">
                <div className="flex flex-col items-end border-r py-2 px-6  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {monthlySaleData.total_days}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-6 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {monthlySaleData.total_vouchers}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-6 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {monthlySaleData.total_cash}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-6 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {monthlySaleData.total_tax}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-6 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {monthlySaleData.total}
                  </p>
                </div>
              </div>
              {/* <Pagination
              value={activePage}
              onChange={setPage}
              total={5}
              siblings={1}
            /> */}
              <nav aria-label="Page navigation example">
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
              </nav>
            </div>
          </div>
        )}
      </div>
    </Rootlayout>
  );
};

export default Monthly;

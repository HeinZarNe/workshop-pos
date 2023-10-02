import React, { useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { PiExportBold, PiFilePdf } from "react-icons/pi";
import DatePicker from "../../components/DatePicker";
import { FiCopy, FiSearch } from "react-icons/fi";
import { BiPrinter, BiSolidCalendarWeek } from "react-icons/bi";
import { Pagination } from "@mantine/core";

import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import { useGetMonthlySalesQuery } from "../../services/authApi";
import { MonthPicker, MonthPickerInput } from "@mantine/dates";
const Monthly = () => {
  const token = localStorage.getItem("token");
  const [activePage, setPage] = useState(1);
  const [value, setValue] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);
  const { data: monthlySaleData } = useGetMonthlySalesQuery({
    token,
    date: dateSearch || false,
  });
  // console.log(monthlySaleData.this_month_sales);

  const handleDateSearch = () => {
    const inputDate = new Date(value);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const formattedDate = `${year}-${month}`;
    setDateSearch(formattedDate);
  };
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
          <div className="flex gap-2 flex-row justify-center items-center text-white ">
            <MonthPickerInput
              placeholder="Pick month"
              value={value}
              className="text-white"
              onChange={setValue}
            />
            <div
              className="flex text-black items-center justify-center font-semibold text-xl  h-fit p-2 rounded-sm bg-base"
              onClick={handleDateSearch}
            >
              <FiSearch />
            </div>
            <div
              className="flex text-black items-center justify-center font-semibold text-xl  h-fit p-2 rounded-sm bg-base"
              onClick={(_) => {
                setValue(null);
                setDateSearch(false);
              }}
            >
              <AiOutlineClose />
            </div>
          </div>
        </div>
        {/* table  */}
        {monthlySaleData?.this_month_sales?.data?.length === 0 ? (
          <div className="bg-[#272727] ">
            <div className="flex justify-between gap-5 ">
              <div className="w-full flex flex-col items-center justify-center h-[50vh]">
                <div className="border border-base px-10 py-5 w-fit gap-3   rounded-lg flex flex-col justify-center items-center">
                  <p className="text-2xl font-semibold">There is no datas.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                        <tr
                          key={data.id}
                          className=" border-b hover:bg-white/10 "
                        >
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
          </>
        )}
      </div>
    </Rootlayout>
  );
};

export default Monthly;

import React, { useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { PiExportBold, PiFilePdf } from "react-icons/pi";
import DatePicker from "../../components/DatePicker";
import { FiCopy, FiSearch } from "react-icons/fi";
import { BiPrinter, BiSolidCalendarWeek } from "react-icons/bi";
import { Pagination, Select } from "@mantine/core";

import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import { useGetYearlySalesQuery } from "../../services/authApi";
import { YearPickerInput } from "@mantine/dates";
const Yearly = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);

  const { data: yearlySaleData, refetch } = useGetYearlySalesQuery({
    token,
    page,
    date: dateSearch || false,
  });

  const handleDateSearch = () => {
    const inputDate = new Date(value);
    setPage(0);
    const year = inputDate.getFullYear();

    setDateSearch(year);
    setPage(0);
  };

  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        {/* top */}
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-white">
              Yearly
            </h1>
            <p className=" text-gray-400">Finance/ Yearly</p>
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
              This Year Sales Overview
            </p>
          </div>
          {/* ... */}
          <div className="flex gap-2 items-center">
            {/* first menu  */}{" "}
            <YearPickerInput
              placeholder="Pick date"
              value={value}
              onChange={setValue}
            />
            {/* second menu  */}
            <div
              className="flex text-black items-center justify-center font-semibold text-xl h-fit p-2  rounded-e-sm bg-base"
              onClick={handleDateSearch}
            >
              <FiSearch />
            </div>
            {dateSearch && (
              <div
                className="flex text-black items-center justify-center font-semibold text-xl  h-fit p-2 rounded-sm bg-base"
                onClick={(_) => {
                  setValue(null);
                  setDateSearch(false);
                }}
              >
                <AiOutlineClose />
              </div>
            )}
          </div>
        </div>
        {/* table  */}
        {yearlySaleData?.yearly_sales?.data?.length === 0 ? (
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
          <div className=" border-2 rounded-t-xl border-base mt-10">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-[#fafafa] ">
                <thead className="text-xs text-gray-900 uppercase bg-base">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      NO
                    </th>
                    <th scope="col" className="px-6 py-3">
                      MONTH
                    </th>
                    <th scope="col" className="px-6 py-3">
                      YEAR
                    </th>
                    <th scope="col" className="px-6 py-3">
                      VOUNCHER
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
                  {yearlySaleData?.yearly_sales?.data?.map((data) => {
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
                        <td className="px-6 py-4">{data.month}</td>
                        <td className="px-6 py-4  text-end">{data.year}</td>
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
        )}
        {/* last  */}
        {yearlySaleData && (
          <div className="">
            <div className="flex flex-row items-center justify-between bottom-section mt-10 ">
              <div className="flex flex-row items-center border rounded ">
                <div className="flex flex-col items-end border-r py-2 px-4  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {yearlySaleData.total_months}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-4 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {yearlySaleData.total_vouchers}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-4 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {yearlySaleData.total_cash}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-4 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {yearlySaleData.total_tax}
                  </p>
                </div>
                <div className="flex flex-col items-end border-r px-4 py-2  border-white">
                  <p className="text-sm text-base">Total Vouchers</p>
                  <p className="text-xl font-bold text-white">
                    {yearlySaleData.total}
                  </p>
                </div>
              </div>
              <div className="pagination ">
                <Pagination
                  onChange={setPage}
                  total={yearlySaleData?.yearly_sales.last_page}
                  siblings={1}
                  value={page || 1}
                />
              </div>
              {/* <nav aria-label="Page navigation example">
                <ul class="flex items-center bg-transparent -space-x-px h-8 text-sm">
                  <li>
                    <a
                      href="#"
                      class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-white border border-base rounded-l-lg hover:text-base "
                    >
                      <span class="sr-only">Previous</span>
                      <svg
                        class="w-2.5 h-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-white border border-base"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center justify-center px-3 h-8 leading-tight text-white bg-base  border border-base hover:text-base "
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center justify-center px-3 h-8 leading-tight text-white   border border-base hover:text-base "
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center justify-center px-3 h-8 leading-tight text-white border border-base rounded-r-lg hover:text-base "
                    >
                      <span class="sr-only">Next</span>
                      <svg
                        class="w-2.5 h-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        )}
      </div>
    </Rootlayout>
  );
};

export default Yearly;

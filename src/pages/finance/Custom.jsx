import React, { useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { PiExportBold, PiFilePdf } from "react-icons/pi";
import DatePicker from "../../components/DatePicker";
import { FiCopy, FiSearch } from "react-icons/fi";
import { BiPrinter } from "react-icons/bi";
import {
  useCustomSaleQuery,
  useGetDailySalesQuery,
} from "../../services/authApi";
import { Pagination } from "@mantine/core";

import { AiOutlineArrowRight } from "react-icons/ai";
const Daily = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [fromTo, setFromTo] = useState(1);
  const [dateSearch, setDateSearch] = useState(false);

  const {
    data: dailySalesData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useCustomSaleQuery({ token, page, date: dateSearch || false });

  const handleDateSearch = () => {
    setPage(0);
    const fromInputDate = new Date(fromTo.from);
    const fromYear = fromInputDate.getFullYear();
    const fromMonth = String(fromInputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const fromDay = String(fromInputDate.getDate()).padStart(2, "0");
    const fromFormattedDate = `${fromYear}-${fromMonth}-${fromDay}`;
    const toInputDate = new Date(fromTo.to);
    const toYear = toInputDate.getFullYear();
    const toMonth = String(toInputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const toDay = String(toInputDate.getDate()).padStart(2, "0");
    const toFormattedDate = `${toYear}-${toMonth}-${toDay}`;
    setDateSearch({ from: fromFormattedDate, to: toFormattedDate });
  };
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        {/* top */}
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-tcolor">
              Custom
            </h1>
            <p className=" text-gray-400">Finance/ Custom</p>
          </div>
          <div className=" flex gap-3">
            {/* <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 rounded-lg text-tcolor border border-[#FFFFFF] hover:bg-[#BB86FC]">
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
            <p className="text-2xl font-semibold mt-0 pt-0 text-tcolor">
              Custom Finance
            </p>
          </div>

          <div className="flex gap-4 flex-row items-end">
            <DatePicker fromTo={fromTo} setFromTo={setFromTo} />

            <div
              className="flex text-black items-center justify-center font-semibold mb-1 text-xl p-2 h-fit rounded-sm bg-primary"
              onClick={handleDateSearch}
            >
              <FiSearch />
            </div>
          </div>
        </div>
        {dateSearch ? (
          <>
            {/* table  */}
            <div className=" border-2 rounded-t-xl border-primary mt-10">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-[#fafafa] ">
                  <thead className="text-xs text-gray-900 uppercase bg-primary">
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
                        <tr
                          key={data.id}
                          className=" border-b hover:bg-white/10 "
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-tcolor whitespace-nowra"
                          >
                            {data.id}
                          </th>
                          <td class="px-6 py-4">{data.voucher_number}</td>
                          <td class="px-6 py-4">{data.time}</td>
                          <td class="px-6 py-4  text-end">{data.item_count}</td>
                          <td class="px-6 py-4  text-end">{data.cash}</td>
                          <td class="px-6 py-4  text-end">{data.tax}</td>
                          <td class="px-6 py-4  text-end">{data.total}</td>
                          <td class="px-6 py-4 text-right">
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
                    <div className="flex flex-col items-end border-r px-6 py-2  border-primary">
                      <p className="text-sm text-primary">Total Vouchers</p>
                      <p className="text-xl font-bold text-tcolor">
                        {dailySalesData.total_vouchers}
                      </p>
                    </div>
                    <div className="flex flex-col items-end border-r py-2 px-6  border-primary">
                      <p className="text-sm text-primary">Total Cash</p>
                      <p className="text-xl font-bold text-tcolor">
                        {dailySalesData.total_cash}
                      </p>
                    </div>
                    <div className="flex flex-col items-end border-r px-6 py-2  border-primary">
                      <p className="text-sm text-primary">Total Tax</p>
                      <p className="text-xl font-bold text-tcolor">
                        {dailySalesData.total_tax}
                      </p>
                    </div>
                    <div className="flex flex-col items-end border-r px-6 py-2  border-primary">
                      <p className="text-sm text-primary">Total</p>
                      <p className="text-xl font-bold text-tcolor">
                        {dailySalesData.total}
                      </p>
                    </div>
                  </div>

                  <Pagination
                    total={dailySalesData?.daily_sales?.last_page}
                    onChange={(e) => {
                      setPage(e);
                      refetch();
                    }}
                    value={page || 1}
                    boundaries={1}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className=" ">
            <div className="flex justify-between gap-5 ">
              <div className="w-full flex flex-col items-center justify-center h-[50vh]">
                <div className="border border-primary px-10 py-5 w-fit gap-3   rounded-lg flex flex-col justify-center items-center">
                  <p className="text-2xl font-semibold">
                    There is no datas. Please enter dates to get custom finance
                    data!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Rootlayout>
  );
};

export default Daily;

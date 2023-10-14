import React, { useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PiExportBold, PiFilePdf } from "react-icons/pi";
import DatePicker from "../../components/DatePicker";
import { FiCopy, FiSearch } from "react-icons/fi";
import { BiPrinter, BiSolidCalendarWeek } from "react-icons/bi";
import { Loader, Pagination } from "@mantine/core";

import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import { useGetMonthlySalesQuery } from "../../services/authApi";
import { MonthPicker, MonthPickerInput } from "@mantine/dates";
import { BaseColor } from "../../constant";
import Swal from "sweetalert2";
const Monthly = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);

  const [value, setValue] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);
  const {
    data: monthlySaleData,
    refetch,
    isLoading: isListLoading,
  } = useGetMonthlySalesQuery({
    token,
    page,
    date: dateSearch || false,
  });
  // console.log(monthlySaleData.this_month_sales);

  const handleDateSearch = () => {
    const inputDate = new Date(value);
    setPage(0);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const formattedDate = `${year}-${month}`;
    setDateSearch(formattedDate);
  };

  const navigate = useNavigate();
  // if (isError) {
  //   Swal.fire({
  //     title: "Something is wrong! <br/> Please try to  Login again",
  //     icon: "error",
  //     buttonsStyling: false,
  //     color: "#bb86fc",
  //     width: "25em",
  //     background: "#1e1e1e",
  //     showConfirmButton: true,
  //     confirmButtonText: "Go to Login Page",
  //     customClass: {
  //       title: "text-primary",
  //       confirmButton:
  //         "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
  //     },
  //   }).then((result) => {
  //     navigate("/login");
  //   });
  // }

  return (
    <Rootlayout>
      {isListLoading ? (
        <div
          style={{
            background: "black",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader variant="bars" size="xl" color={BaseColor} />
        </div>
      ) : (
        <div className="mx-10 my-5">
          {/* top */}
          <div className=" flex  justify-between">
            <div className="">
              <h1 className="text-2xl font-semibold mt-0 pt-0 text-tcolor">
                Monthly
              </h1>
              <p className=" text-gray-400">Finance/ Monthly</p>
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
                This Month Sales Overview
              </p>
            </div>
            {/* ... */}
            <div className="flex gap-2 flex-row justify-center items-center text-tcolor ">
              <MonthPickerInput
                placeholder="Pick month"
                value={value}
                className="text-tcolor"
                onChange={setValue}
              />
              <div
                className="flex text-black items-center justify-center font-semibold text-xl  h-fit p-2 rounded-sm bg-primary"
                onClick={handleDateSearch}
              >
                <FiSearch />
              </div>
              {dateSearch && (
                <div
                  className="flex text-black items-center justify-center font-semibold text-xl  h-fit p-2 rounded-sm bg-primary"
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
          {monthlySaleData?.this_month_sales?.data?.length === 0 ? (
            <div className="">
              <div className="flex justify-between gap-5 ">
                <div className="w-full flex flex-col items-center justify-center h-[50vh]">
                  <div className="border border-primary px-10 py-5 w-fit gap-3   rounded-lg flex flex-col justify-center items-center">
                    <p className="text-2xl font-semibold">There is no datas.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className=" border-2 rounded-t-xl border-primary mt-10">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-[#fafafa] ">
                    <thead className="text-xs text-gray-900 uppercase bg-primary">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          <div className="text-secondary">NO</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="text-secondary">DATE</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="text-secondary">VOUCHERS</div>
                        </th>
                        <th scope="col" className="px-6  text-end py-3">
                          <div className="text-secondary">CASH</div>
                        </th>
                        <th scope="col" className="px-6  text-end py-3">
                          <div className="text-secondary">TAX</div>
                        </th>
                        <th scope="col" className="px-6  text-end py-3">
                          <div className="text-secondary">TOTAL</div>
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
                              className="px-6 py-4 font-medium text-tcolor whitespace-nowra"
                            >
                              {data.id}
                            </th>
                            <td className="px-6 py-4">{data.date}</td>
                            <td className="px-6 py-4">{data.vouchers}</td>
                            <td className="px-6 py-4  text-end">{data.cash}</td>
                            <td className="px-6 py-4  text-end">{data.tax}</td>
                            <td className="px-6 py-4  text-end">
                              {data.total}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <NavLink
                                to={"/profile"}
                                className="font-medium flex justify-center text-blue-600  hover:underline"
                              >
                                <button className="flex items-center mx-auto justify-center w-7 h-7 rounded-full bg-primary text-black">
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
                    <div className="flex flex-row items-center border-primary border rounded">
                      <div className="flex flex-col items-end border-r py-2 px-6  border-primary">
                        <p className="text-sm text-primary">Total Vouchers</p>
                        <p className="text-xl font-bold text-tcolor">
                          {monthlySaleData.total_days}
                        </p>
                      </div>
                      <div className="flex flex-col items-end border-r px-6 py-2  border-primary">
                        <p className="text-sm text-primary">Total Vouchers</p>
                        <p className="text-xl font-bold text-tcolor">
                          {monthlySaleData.total_vouchers}
                        </p>
                      </div>
                      <div className="flex flex-col items-end border-r px-6 py-2  border-primary">
                        <p className="text-sm text-primary">Total Vouchers</p>
                        <p className="text-xl font-bold text-tcolor">
                          {monthlySaleData.total_cash}
                        </p>
                      </div>
                      <div className="flex flex-col items-end border-r px-6 py-2  border-primary">
                        <p className="text-sm text-primary">Total Vouchers</p>
                        <p className="text-xl font-bold text-tcolor">
                          {monthlySaleData.total_tax}
                        </p>
                      </div>
                      <div className="flex flex-col items-end border-r px-6 py-2  border-primary">
                        <p className="text-sm text-primary">Total Vouchers</p>
                        <p className="text-xl font-bold text-tcolor">
                          {monthlySaleData.total}
                        </p>
                      </div>
                    </div>
                    <div className="pagination ">
                      <Pagination
                        total={monthlySaleData?.this_month_sales?.last_page}
                        onChange={(e) => {
                          setPage(e);
                        }}
                        value={page || 1}
                        boundaries={1}
                        defaultValue={1}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Rootlayout>
  );
};

export default Monthly;

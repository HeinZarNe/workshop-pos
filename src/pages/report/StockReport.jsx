import React, { useEffect, useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import {
  BsCart3,
  BsClipboard2Pulse,
  BsCoin,
  BsDash,
  BsPencil,
  BsPlus,
} from "react-icons/bs";
import { HiArrowSmallUp } from "react-icons/hi2";
import DonutChart from "./DonutChart";
import DonutChart1 from "./DonutChart1";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  useGetStockBestSellerQuery,
  useGetStockQuery,
} from "../../services/authApi";

const StockReport = () => {
  const token = localStorage.getItem("token");
  const { data: stockLevel } = useGetStockBestSellerQuery(token);
  const { data: stockData } = useGetStockQuery(token);
  // const outOfStock = `w-[52.17%] h-full bg-blue-300`;
  // const inStock = `w-[47.83%] h-full bg-[#884A39]`;
  const inStock = `w-[${stockLevel?.stock_lvl_bar?.in_stock[1]}] h-full bg-[#884A39]`;
  const outOfStock = `w-[${stockLevel?.stock_lvl_bar?.out_of_stock[1]}] h-full bg-[#FFC26F]`;
  // const lowStock = `w-[0%] h-full bg-yellow-300`;
  const lowStock = `w-[${stockLevel?.stock_lvl_bar?.low_stock[1]}] h-full bg-yellow-300`;
  console.log(inStock);
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-white">
              Stock
            </h1>
            <p className=" text-gray-400">Report/ Stock</p>
          </div>
          <div className=" flex gap-3">
            <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 mt-1 rounded-lg text-base border border-base hover:text-black hover:bg-base">
                {" "}
                Go To Shop
              </button>
            </Link>
            <Link to={"/products/create"}>
              <button className=" px-4 py-2 mt-1 text-black rounded-lg pe-6 flex items-center  button">
                <BsPlus className="text-2xl flex pt-1 items-center me-1" /> Add
                Product
              </button>
            </Link>
          </div>
        </div>
        {/* second  */}
        <div className="grid grid-cols-2 mt-12 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-base flex itmes-center justify-around rounded-md py-4 p-3 ">
              <div className="flex">
                <div className=" rounded-full bg-[#202020] p-3">
                  <div className=" rounded-full bg-[#262626] p-4 border-[1px] border-base">
                    <BsCart3 size={28} className="text-base" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-semibold text-white">
                  {stockLevel?.total_product}
                </p>
                <p className="text-lg">Total Products</p>
              </div>
            </div>
            <div className="border border-base flex itmes-center justify-around rounded-md py-4 p-3 ">
              <div className="flex">
                <div className=" rounded-full bg-[#202020] p-3">
                  <div className=" rounded-full bg-[#262626] p-4 border-[1px] border-base">
                    <BsCoin size={28} className="text-base" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-semibold text-white">
                  {stockLevel?.total_brand}
                </p>
                <p className="text-lg">Total Brands</p>
              </div>
            </div>
            <div className="col-span-2 border  border-base  rounded-md p-5 ">
              <div className="flex justify-between items-center">
                {stockLevel?(
                  <div className=" flex w-[75%] overflow-hidden h-3 rounded-full ">
                  <div className={inStock}></div>
                  <div className={outOfStock}></div>
                  <div className={lowStock}></div>
                </div>
                ):null}
       
                <div className="w-[100px]">
                  <p className="text-3xl text-white font-semibold">89,798</p>
                  <p className="text-lg">Products</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex border-t border-secondary py-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#884A39] rounded-full"></div>{" "}
                    <p className="text-lg">Instock</p>
                  </div>
                  <div className="flex gap-7">
                    <p className="text-lg">
                      {stockLevel?.stock_lvl_bar?.in_stock[0]}
                    </p>
                    <div className="text-lg flex w-20 justify-end items-center">
                      {stockLevel?.stock_lvl_bar?.in_stock[1]}
                      <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-secondary py-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#C38154] rounded-full"></div>{" "}
                    <p className="text-lg">Low stock</p>
                  </div>
                  <div className="flex gap-7">
                    <p className="text-lg">
                      {stockLevel?.stock_lvl_bar?.low_stock[0]}
                    </p>
                    <div className="text-lg w-20 justify-end flex items-center">
                      {stockLevel?.stock_lvl_bar?.low_stock[1]}
                      <BsDash className="ms-2 text-yellow-500" />{" "}
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-secondary py-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#FFC26F] rounded-full"></div>{" "}
                    <p className="text-lg">Out of stock</p>
                  </div>
                  <div className="flex gap-7">
                    <p className="text-lg">
                      {stockLevel?.stock_lvl_bar?.out_of_stock[0]}
                    </p>
                    <div className="text-lg w-20 justify-end flex items-center">
                      {stockLevel?.stock_lvl_bar?.out_of_stock[1]}
                      <HiArrowSmallUp className="ms-2 rotate-180 text-red-500" />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-base rounded-md">
            <div className="text-3xl font-semibold flex text-white">
              Best Seller Brands
            </div>
            <div className="flex mt-1 items-center justify-between">
              <div className="w-[40%]">
                <div className="hidden">
                  <DonutChart />
                </div>
                <DonutChart1 className="w-full" />
              </div>
              <div className="w-[55%]">
                <div className="text-3xl text-white font-semibold ms-auto text-end">
                  62,000k
                </div>
                <div className="text-end text-lg mt-[-8px] mb-2">kyats</div>
                <div className="">
                  <div className="flex border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#884A39] rounded-full"></div>{" "}
                      <p className="text-lg">Instock</p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">{}</p>
                      <div className="text-lg flex items-center">
                        65% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#C38154] rounded-full"></div>{" "}
                      <p className="text-lg">Instock</p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">100</p>
                      <div className="text-lg flex items-center">
                        65% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#FFC26F] rounded-full"></div>{" "}
                      <p className="text-lg">Low stock</p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">100</p>
                      <div className="text-lg flex items-center">
                        25% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#F9E0BB] rounded-full"></div>{" "}
                      <p className="text-lg">Out of stock</p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">100</p>
                      <div className="text-lg flex items-center">
                        15% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline border-base ms-auto flex mt-3 hover:bg-base hover:text-white">
                  RECENT SALES
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="text-3xl mb-4  font-semibold text-white">
            Stock Overview
          </div>
          <div className="flex justify-between">
            <div class="relative my-3">
              <div class="absolute inset-y-0 left-0 flex items-center focus:border-base pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-[300px] p-2 pl-10 text-sm focus:border-base text-white border border-gray-600 rounded-lg bg-[#272727]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search ..."
                required
              />
            </div>
            <div className="flex gap-5">
              <div className="flex items-center">
                <div className="">Sort:</div>
                <select
                  id="countries"
                  class=" w-20  text-white bg-transparent text-sm rounded-sm p-2.5 "
                >
                  <option className="text-base" selected>
                    In stock
                  </option>
                  <option className="text-base" value="22">
                    ...
                  </option>
                  <option className="text-base" value="21">
                    ....
                  </option>
                </select>
              </div>
              <div className="flex items-center">
                <div className="">Filter:</div>
                <select
                  id="countries"
                  class=" w-20  text-white bg-transparent text-sm rounded-sm p-2.5 "
                >
                  <option className="text-base" selected>
                    All file
                  </option>
                  <option className="text-base" value="22">
                    ...
                  </option>
                  <option className="text-base" value="21">
                    ....
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className=" border-2 rounded-t-xl border-base mt-2">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-[#fafafa] ">
                <thead class="text-xs text-gray-900 uppercase bg-base">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      NO
                    </th>
                    <th scope="col" class="px-6 py-3">
                      NAME
                    </th>
                    <th scope="col" class="px-6 py-3">
                      BRAND
                    </th>
                    <th scope="col" class="px-6 py-3">
                      UNIT
                    </th>
                    <th scope="col" class="px-6 text-end py-3">
                      SALE PRICE
                    </th>
                    <th scope="col" class="px-6  text-end py-3">
                      TOTAL STOCK
                    </th>
                    <th scope="col" class="px-6  text-center py-3">
                      STOCK LEVEL
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {stockData && (
                  <tbody>
                    {stockData?.data.map((e) => {
                      return (
                        <tr key={e.id} class=" border-b hover:bg-white/10 ">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-white whitespace-nowra"
                          >
                            {e.id}
                          </th>
                          <td class="px-6 py-4">{e.name}</td>
                          <td class="px-6 py-4">{e.brand_name}</td>
                          <td class="px-6 py-4  text-end">{e.unit}</td>
                          <td class="px-6 py-4  text-end">{e.sale_price}</td>
                          <td class="px-6 py-4  text-end">{e.total_stock}</td>
                          <td class="px-6 py-4  text-center">
                            {e.stock_levle == "In Stock" ? (
                              <div className="bg-green-500 border-2 bg-opacity-30 border-green-400 p-3 px-2 rounded-full">
                                {e.stock_levle}
                              </div>
                            ) : (
                              <div className="bg-red-500 border-2 bg-opacity-30 border-red-400 p-3 px-2 rounded-full">
                                {e.stock_levle}
                              </div>
                            )}
                          </td>
                          <td class="px-6 py-4 text-right flex gap-2 justify-center">
                            <NavLink
                              to={"/profile"}
                              class="font-medium flex justify-center text-blue-600  hover:underline"
                            >
                              <button className="flex items-center hover:bg-base/70 justify-center w-8 h-8 rounded-full bg-base text-white">
                                <BsPlus />
                              </button>
                            </NavLink>
                            <NavLink
                              to={"/profile"}
                              class="font-medium flex justify-center text-blue-600  hover:underline"
                            >
                              <button className="flex items-center hover:bg-base/70 justify-center w-8 h-8 rounded-full bg-base text-white">
                                <BsPencil />
                              </button>
                            </NavLink>
                            <NavLink
                              to={"/profile"}
                              class="font-medium  flex justify-center text-blue-600  hover:underline"
                            >
                              <button className="flex items-center hover:bg-base/70 justify-center w-8 h-8 rounded-full bg-base text-white">
                                <AiOutlineArrowRight />
                              </button>
                            </NavLink>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default StockReport;

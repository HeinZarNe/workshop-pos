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
  useGetStockQuery,
  useGetBrandReportQuery,
  useGetStockLevelBarQuery,
  useGetStockLevelTableQuery,
  useGetBestSellerBrandsQuery,
  useGetMonthlyOverviewQuery,
  useGetWeeklyOverviewQuery,
  useGetYearlyOverviewQuery,
} from "../../services/authApi";
import { Pagination } from "@mantine/core";

const StockReport = () => {
  // const [view, setView] = useState("list");
  // const [showSidebar, setShowSidebar] = useState(false);
  // const [stockData, setStockData] = useState({});
  // const [keyword, setKeyword] = useState("");
  // const [addStock, setAddStock] = useState(false);

  // Pagination
  const [page, setPage] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const token = localStorage.getItem("token");
  const [filter, setFilter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const { data: stockLeveltable, refetch } = useGetStockLevelTableQuery({
    token,
    page,
    filter,
    keyword,
  });

  const handleSearch = (e) => {
    setFilter(0);
    setPage(0);
    setKeyword(e.target.value);
  };
  useEffect(() => {
    refetch();
    return () => {};
  }, [stockLeveltable]);

  useEffect(() => {
    setTotalPage(stockLeveltable?.meta.last_page);
    return () => {};
  }, [stockLeveltable]);
  // Pagination

  // OTHER
  // const { data: stockData } = useGetStockQuery({ token });
  const { data: stockLevelBar } = useGetStockLevelBarQuery(token);
  const { data: bestSeller } = useGetBestSellerBrandsQuery(token);
  // const { data: stockBrand } = useGetBrandReportQuery(token);
  const inW = stockLevelBar?.stock_lvl_bar?.in_stock[1];
  const lW = stockLevelBar?.stock_lvl_bar?.low_stock[1];
  const oW = stockLevelBar?.stock_lvl_bar?.out_of_stock[1];
  console.log(stockLevelBar?.stock_lvl_bar);
  const inStock = inW ? ` w-[${parseFloat(inW)}%]` : "w-0";
  const outOfStock = `w-[${oW}]`;
  const lowStock = `w-[${lW}] `;
  console.log(inStock);
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-tcolor">
              Stock
            </h1>
            <p className=" text-gray-400">Report/ Stock</p>
          </div>
          <div className=" flex gap-3">
            <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 mt-1 rounded-lg text-primary border border-primary hover:text-secondary  hover:bg-primary">
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
            <div className="border border-primary flex itmes-center justify-around rounded-md py-4 p-3 ">
              <div className="flex">
                <div className=" rounded-full bg-[#202020] p-3">
                  <div className=" rounded-full bg-[#262626] p-4 border-[1px] border-primary">
                    <BsCart3 size={28} className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-semibold text-tcolor">
                  {stockLevelBar?.total_product}
                </p>
                <p className="text-lg">Total Products</p>
              </div>
            </div>
            <div className="border border-primary flex itmes-center justify-around rounded-md py-4 p-3 ">
              <div className="flex">
                <div className=" rounded-full bg-[#202020] p-3">
                  <div className=" rounded-full bg-[#262626] p-4 border-[1px] border-primary">
                    <BsCoin size={28} className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-semibold text-tcolor">
                  {stockLevelBar?.total_brand}
                </p>
                <p className="text-lg">Total Brands</p>
              </div>
            </div>
            <div className="col-span-2 border  border-primary  rounded-md p-5 ">
              <div className="flex justify-between items-center">
                {stockLevelBar ? (
                  <div className=" flex w-3/4  overflow-hidden h-3 rounded-full ">
                    <div className={inStock}>
                      {/* <div className={`bg-[#660066]  h-full ${inStock}`}> */}
                    </div>
                    <div className={`bg-[#BE29EC] h-full  ${lowStock}`}></div>
                    <div className={`bg-[#EFBBFF] h-full  ${outOfStock}`}></div>
                  </div>
                ) : null}

                <div className="w-[100px]">
                  <p className="text-3xl text-tcolor text-center mx-auto flex justify-center me-6 font-semibold">
                    {stockLevelBar?.total_product}
                  </p>
                  <p className="text-lg">Products</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex border-t border-secondary py-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#660066] rounded-full"></div>{" "}
                    <p className="text-lg">Instock</p>
                  </div>
                  <div className="flex gap-7">
                    <p className="text-lg">
                      {stockLevelBar?.stock_lvl_bar?.in_stock[0]}
                    </p>
                    <div className="text-lg flex w-20 justify-end items-center">
                      {stockLevelBar?.stock_lvl_bar?.in_stock[1]}
                      <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-secondary py-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#BE29EC] rounded-full"></div>{" "}
                    <p className="text-lg">Low stock</p>
                  </div>
                  <div className="flex gap-7">
                    <p className="text-lg">
                      {stockLevelBar?.stock_lvl_bar?.low_stock[0]}
                    </p>
                    <div className="text-lg w-20 justify-end flex items-center">
                      {stockLevelBar?.stock_lvl_bar?.low_stock[1]}
                      <BsDash className="ms-2 text-yellow-500" />{" "}
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-secondary py-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#EFBBFF] rounded-full"></div>{" "}
                    <p className="text-lg">Out of stock</p>
                  </div>
                  <div className="flex gap-7">
                    <p className="text-lg">
                      {stockLevelBar?.stock_lvl_bar?.out_of_stock[0]}
                    </p>
                    <div className="text-lg w-20 justify-end flex items-center">
                      {stockLevelBar?.stock_lvl_bar?.out_of_stock[1]}
                      <HiArrowSmallUp className="ms-2 rotate-180 text-red-500" />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-primary rounded-md">
            <div className="text-3xl font-semibold flex text-tcolor">
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
                <div className="text-3xl text-tcolor font-semibold ms-auto text-end">
                  {bestSeller?.weekly_total_cost}
                </div>
                <div className="text-end text-lg mt-[-8px] mb-2">kyats</div>
                <div className="">
                  <div className="flex border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#660066] rounded-full"></div>{" "}
                      <p className="text-lg">
                        {bestSeller?.weekly_best_seller_brands[0].brand_name}
                      </p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">
                        {bestSeller?.weekly_best_seller_brands[0].quantity}
                      </p>
                      <div className="text-lg w-16 flex items-center">
                        35% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#BE29EC] rounded-full"></div>{" "}
                      <p className="text-lg">
                        {bestSeller?.weekly_best_seller_brands[1].brand_name}
                      </p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">
                        {bestSeller?.weekly_best_seller_brands[1].quantity}
                      </p>
                      <div className="text-lg w-16 flex items-center">
                        5% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#EFBBFF] rounded-full"></div>{" "}
                      {bestSeller?.weekly_best_seller_brands[2].brand_name}
                      <p className="text-lg"></p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">
                        {bestSeller?.weekly_best_seller_brands[2].quantity}
                      </p>
                      <div className="text-lg w-16 flex items-center">
                        25% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-secondary py-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#E53F71] rounded-full"></div>{" "}
                      <p className="text-lg">
                        {bestSeller?.weekly_best_seller_brands[3].brand_name}
                      </p>
                    </div>
                    <div className="flex gap-7">
                      <p className="text-lg">
                        {bestSeller?.weekly_best_seller_brands[3].quantity}
                      </p>
                      <div className="text-lg w-16 flex items-center">
                        15% <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/sale/recent">
                  <button className="btn btn-outline text-primary border-primary ms-auto flex mt-3 hover:bg-primary hover:text-secondary">
                    RECENT SALES
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="text-3xl mb-4  font-semibold text-tcolor">
            Stock Overview
          </div>
          <div className="flex justify-between">
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center focus:border-primary pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={keyword}
                onChange={handleSearch}
                id="default-search"
                className="block w-[300px] p-2 pl-10 text-sm focus:border-primary text-tcolor border border-gray-600 rounded-lg bg-[#272727]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-tcolor"
                placeholder="Search ..."
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="">Sort:</div>
              <select
                id="countries"
                className=" flex   items-center justify-center border border-primary  text-tcolor bg-transparent text-sm rounded-md p-2 "
                onChange={(e) => setFilter(e.target.value)}
              >
                <option
                  className="text-black py-3 px-2 "
                  selected={filter === 0}
                  value="0"
                >
                  All stocks
                </option>
                <option
                  className="text-black py-3 px-2"
                  selected={filter === "in_stock"}
                  value="in_stock"
                >
                  In Stock
                </option>
                <option
                  className="text-black py-3 px-2"
                  selected={filter === "low_stock"}
                  value="low_stock"
                >
                  Low stock
                </option>
                <option
                  className="text-black py-3 px-2"
                  selected={filter === "out_of_stock"}
                  value="out_of_stock"
                >
                  Out of stock
                </option>
              </select>
            </div>
          </div>
          <div className=" border-2 rounded-t-xl border-primary mt-2">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="text-xs bg-primary">
                  <tr>
                    <th scope="col" className="px-6">
                      <span className="text-secondary"> NO</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="text-secondary"> NAME</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="text-secondary">BRAND </span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-end">
                      <span className="text-secondary">UNIT </span>
                    </th>
                    <th scope="col" className="px-6 text-end py-3">
                      <span className="text-secondary"> SALE PRICE</span>
                    </th>
                    <th scope="col" className="px-6  text-end py-3">
                      <span className="text-secondary">TOTAL STOCK</span>
                    </th>
                    <th scope="col" className="px-6  text-center py-3">
                      <span className="text-secondary"> STOCK LEVEL</span>
                    </th>
                  </tr>
                </thead>
                {stockLeveltable && (
                  <tbody>
                    {stockLeveltable?.data.map((e) => {
                      return (
                        <tr key={e.id} className=" border-b hover:bg-white/10 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-tcolor whitespace-nowra"
                          >
                            {e.id}
                          </th>
                          <td className="px-6 py-4">{e.name}</td>
                          <td className="px-6 py-4">{e.brand_name}</td>
                          <td className="px-6 py-4  text-end">{e.unit}</td>
                          <td className="px-6 py-4  text-end">
                            {e.sale_price}
                          </td>
                          <td className="px-6 py-4  text-end">
                            {e.total_stock}
                          </td>
                          <td className="px-6 py-4  text-center">
                            {e.stock_levle == "In Stock" ? (
                              <div className="bg-green-500 border-2 bg-opacity-30 border-green-400 p-3 px-2 rounded-full">
                                {e.stock_levle}
                              </div>
                            ) : e.stock_levle == "Low Stock" ? (
                              <div className="bg-red-500 border-2 bg-opacity-30 border-red-400 p-3 px-2 rounded-full">
                                {e.stock_levle}
                              </div>
                            ) : (
                              <div className="bg-blue-500 border-2 bg-opacity-30 border-blue-400 p-3 px-2 rounded-full">
                                {e.stock_levle}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <div className="pagination flex justify-end mt-5 me-3">
            <Pagination
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
            />
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default StockReport;

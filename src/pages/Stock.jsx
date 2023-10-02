import React, { useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { AiOutlinePlus, AiOutlineOrderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { Link } from "react-router-dom";
import StockTable from "../components/stock/StockTable";
import StockCard from "../components/stock/StockCard";
import AddStock from "../components/stock/AddStock";
import { useGetStockQuery } from "../services/authApi";
import { Pagination } from "@mantine/core";

const Stock = () => {
  const [showSidebar, setShowSideBar] = useState(false);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [stockData, setStockData] = useState({});
  const token = localStorage.getItem("token");
  const { data: stocks } = useGetStockQuery({ token, page, keyword });

  return (
    <Rootlayout>
      {/* {showSidebar && (
        <AddStock
          stockData={stockData}
          setStockData={setStockData}
          showSidebar={showSidebar}
          setShowSideBar={setShowSideBar}
        />
      )} */}
      <div className=" mx-10 my-5">
        <div className=" flex justify-between">
          <div className="">
            <h1 className=" text-[20px] font-[500] text-white">
              Stock Control
            </h1>
            <p className=" text-gray-500">Inventory/Stock Control</p>
          </div>
          {/* <div className=" flex gap-3">
            <Link to={""}>
              <button
                onClick={() => setShowSideBar(true)}
                className=" px-4 py-2 rounded-lg flex items-center gap-2 button"
              >
                {" "}
                <AiOutlinePlus />
                Add Stock
              </button>
            </Link>
          </div> */}
        </div>
        {/* product overview */}
        <div className=" my-5">
          <h1 className="text-[21px] font-[500] text-white">Stock Overview</h1>
          {/* search */}
          <div className="flex justify-between">
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(0);
                }}
                type="search"
                id="default-search"
                className="block w-[300px] p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-[#272727]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search ..."
                required
              />
            </div>
          </div>
          <StockTable stocksData={stocks} />
          <div className="pagination absolute bottom-[30px] right-[40px] ">
            <Pagination
              total={stocks?.last_page || 1}
              onChange={(e) => {
                setPage(e);
                refetch();
              }}
              boundaries={1}
              defaultValue={1}
            />
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default Stock;

import React, { useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { AiOutlinePlus, AiOutlineOrderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import ProductTables from "../components/products/ProductTables";
import ProductCard from "../components/products/ProductCard";
import { Link } from "react-router-dom";
import AddStock from "../components/stock/AddStock";
import BannedTables from "./BannedTable";
import { Pagination } from "@mantine/core";

const BannedUser = () => {
  const [stockData, setStockData] = useState({});
  const [addStock, setAddStock] = useState(false);
  const [keyword, setKeyword] = useState("");

  return (
    <Rootlayout>
      <div className=" mx-10 my-5">
        <div className=" flex justify-between">
          <div className="">
            <h1 className=" text-[20px] font-[500] text-white">Banned Users</h1>
            <p className=" text-gray-500">User/ Banned User </p>
          </div>
        </div>
        {/* product overview */}
        <div className=" my-5">
          <h1 className="text-[21px] font-[500] text-white">
            Banned User List
          </h1>
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
                type="search"
                id="default-search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="block w-[300px] p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-[#272727]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search ..."
                required
              />
            </div>
          </div>

          <BannedTables keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>
    </Rootlayout>
  );
};

export default BannedUser;

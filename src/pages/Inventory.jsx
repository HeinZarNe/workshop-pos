import React, { useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { AiOutlinePlus, AiOutlineOrderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import ProductTables from "../components/products/ProductTables";
import ProductCard from "../components/products/ProductCard";
import { Link } from "react-router-dom";
import AddStock from "../components/stock/AddStock";
import { Pagination } from "@mantine/core";

const Inventory = () => {
  const [view, setView] = useState("list");
  const [showSidebar, setShowSidebar] = useState(false);
  const [stockData, setStockData] = useState({});
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [addStock, setAddStock] = useState(false);
  return (
    <Rootlayout>
      {showSidebar && (
        <AddStock
          showSidebar={showSidebar}
          setShowSideBar={setShowSidebar}
          stockData={stockData}
          setStockData={setStockData}
          setAddStock={setAddStock}
        />
      )}
      <div className=" mx-10 my-5">
        <div className=" flex justify-between">
          <div className="">
            <h1 className=" text-[20px] font-[500] text-tcolor">Products</h1>
            <p className=" text-tscolor">Inventory/ Products</p>
          </div>
          <div className=" flex gap-3">
            <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 rounded-lg text-primary border border-primary hover:bg-primary hover:text-secondary">
                {" "}
                Go To Shop
              </button>
            </Link>
            <Link to={"/products/create"}>
              <div className=" px-4 py-2 rounded-lg flex text-secondary items-center gap-2 bg-primary hover:bg-transparent hover:text-primary hover:border hover:border-primary">
                {" "}
                <AiOutlinePlus />
                Add Product
              </div>
            </Link>
          </div>
        </div>
        {/* product overview */}
        <div className=" my-5">
          <h1 className="text-[21px] font-[500] text-tcolor">
            Products Overview
          </h1>
          {/* search */}
          <div className="flex justify-between">
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-primary"
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
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(0);
                }}
                value={keyword}
                id="default-search"
                className="block w-[300px] p-2 pl-10 text-sm text-tcolor border border-gray-600 rounded-lg bg-secondary  dark:border-gray-600 dark:placeholder-gray-400 dark:text-tcolor"
                placeholder="Search ..."
                required
              />
            </div>
            <div className=" text-tcolor text-[22px]">
              <button
                onClick={() => setView("list")}
                className={`${
                  view === "list"
                    ? "border border-primary text-primary p-2 mr-5"
                    : "border border-tcolor p-2 mr-5"
                }`}
              >
                {" "}
                <AiOutlineOrderedList />{" "}
              </button>
              <button
                onClick={() => setView("grid")}
                className={`${
                  view === "grid"
                    ? "border border-primary text-primary p-2 mr-5"
                    : "border border-tcolor p-2 mr-5"
                }`}
              >
                {" "}
                <BsGrid />{" "}
              </button>
            </div>
          </div>
          {view === "list" ? (
            <ProductTables
              setShowSidebar={setShowSidebar}
              addStock={addStock}
              keyword={keyword}
              setStockData={setStockData}
              page={page}
              setTotalPage={setTotalPage}
            />
          ) : (
            <ProductCard keyword={keyword} page={page} />
          )}
          <div className="pagination absolute bottom-[30px] right-[40px] ">
            <Pagination
              total={totalPage || 1}
              onChange={(e) => {
                setPage(e);
                // refetch();
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

export default Inventory;

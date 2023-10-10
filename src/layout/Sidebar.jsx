import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import {
  BsChevronDown,
  BsShopWindow,
  BsClipboard,
  BsCashCoin,
} from "react-icons/bs";
import { BiUserPlus, BiLogOut } from "react-icons/bi";
import { TfiGallery } from "react-icons/tfi";
import { FaChartPie, FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Logout from "../components/Logout";

const Sidebar = () => {
  // console.log(window.location.pathname)
  const pathName = window.location.pathname;
  console.log(pathName);
  return (
    <div className="inline-block bg-secondary max-h-[calc(100vh-57px)] overflow-y-auto w-[240px]">
      {/* <div className=" inline-block w-[15%] bg-[#323232] h-[calc(100vh-57px)] overflow-auto"> */}
      {/* <Navbar /> */}
      <div className="">
        {/* overview */}
        <div className=" px-5 py-3  border-b border-stone-500">
          <NavLink to="/" className="ms-1 flex items-center mt-2 text-tcolor">
            <span className=" text-2xl mr-2">
              <div className="flex justify-center w-7">
                <BiHomeCircle />
              </div>
            </span>
            <h1 className="text-[15px] font-semibold">Overview</h1>
          </NavLink>
        </div>
        {/* sale */}
        <div
          className={
            pathName == "/sale/recent"
              ? "collapse border-b collapse-open border-stone-500 rounded-none"
              : "collapse border-b border-stone-500 rounded-none"
          }
        >
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex  w-[160px] px-2 justify-between items-center ">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl text-tcolor flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BsShopWindow />
                </div>
                <h1 className=" text-[15px] font-semibold">Sales</h1>
              </span>
              <span className=" mt-3 text-tcolor">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink className="text-tscolor" to={"/sale/cashier"}>
                <li className=" ml-10 mb-3">Cashier</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/sale/recent"}>
                <li className=" ml-10 mb-3">Recent</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* Inventory */}
        <div
          className={
            pathName === "/products/create" ||
            pathName === "/products" ||
            pathName === "/stock" ||
            pathName === "/brand"
              ? "collapse border-b collapse-open border-stone-500 rounded-none"
              : "collapse border-b border-stone-500 rounded-none"
          }
        >
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl text-tcolor flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BsClipboard />
                </div>
                <h1 className=" text-[15px] font-semibold">Inventory</h1>
              </span>
              <span className=" mt-3 text-tcolor">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink className="text-tscolor" to={"/products"} end>
                <li className=" ml-10 mb-3">Products</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/products/create"}>
                <li className=" ml-10 mb-3">Add Product</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/stock"}>
                <li className=" ml-10 mb-3">Stock Control</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/brand"}>
                <li className=" ml-10 mb-3">Manage Brands</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* Report */}
        <div
          className={
            pathName === "/stock-report" || pathName === "/sale-report"
              ? "collapse border-b collapse-open border-stone-500 rounded-none"
              : "collapse border-b border-stone-500 rounded-none"
          }
        >
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-tcolor flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <FaChartPie />
                </div>
                <h1 className=" text-[15px] font-semibold">Report</h1>
              </span>
              <span className=" mt-3 text-tcolor">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink className="text-tscolor" to={"/stock-report"}>
                <li className="ml-10 mb-3">Stock</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/sale-report"}>
                <li className="ml-10 mb-3">Sale</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* finance */}
        <div
          className={
            pathName === "/daily" ||
            pathName === "/monthly" ||
            pathName === "/yearly" ||
            pathName === "/custom"
              ? "collapse border-b collapse-open border-stone-500 rounded-none"
              : "collapse border-b border-stone-500 rounded-none"
          }
        >
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-tcolor flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BsCashCoin />
                </div>
                <h1 className=" text-[15px] font-semibold">Finance</h1>
              </span>
              <span className=" mt-3 text-tcolor">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink className="text-tscolor" to={"/daily"}>
                <li className=" ml-10 mb-3">Daily</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/monthly"}>
                <li className=" ml-10 mb-3">Monthly</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/yearly"}>
                <li className=" ml-10 mb-3">Yearly</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/custom"}>
                <li className=" ml-10 mb-3">Custom</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* User */}
        <div
          className={
            pathName === "/users" ||
            pathName === "/users/create" ||
            pathName === "/users/banned"
              ? "collapse border-b collapse-open border-stone-500 rounded-none"
              : "collapse border-b border-stone-500 rounded-none"
          }
        >
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex justify-between w-[160px] items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-tcolor flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BiUserPlus className="text-2xl" />
                </div>
                <h1 className=" text-[15px] font-semibold">User</h1>
              </span>
              <span className=" mt-3 text-tcolor">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink end className="text-tscolor" to={"/users"}>
                <li className="  ml-10 mb-3">Overview</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/users/create"}>
                <li className=" ml-10 mb-3">Create User</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/users/banned"}>
                <li className="ml-10 mb-3">Banned User</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* media */}
        <div className=" px-5 py-3  border-b border-stone-500">
          <NavLink
            to={"/media"}
            className=" w-[160px] px-1 flex items-center mt-2 text-tcolor"
          >
            <span className=" text-xl mr-2">
              <div className="flex justify-center w-7">
                <TfiGallery />
              </div>
            </span>
            <h1 className="text-[15px] font-semibold">Media</h1>
          </NavLink>
        </div>
        {/* profile */}
        <div
          className={
            pathName === "/profile/edit" || pathName === "/profile"
              ? "collapse border-b collapse-open border-stone-500 rounded-none"
              : "collapse border-b border-stone-500 rounded-none"
          }
        >
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-tcolor flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <FaRegUserCircle />
                </div>
                <h1 className=" text-[15px] font-semibold">Profile</h1>
              </span>
              <span className=" mt-3 text-tcolor ">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink className="text-tscolor" to={"/profile"} end>
                <li className=" ml-10 mb-3">My Account</li>
              </NavLink>
              <NavLink className="text-tscolor" to={"/profile/edit"}>
                <li className="  ml-10 mb-3">Edit</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* logout */}
        <div className=" px-5 py-3 text-[15px] font-semibold  border-b border-stone-500">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

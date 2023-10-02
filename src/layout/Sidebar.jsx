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
  return (
    <div className="inline-block bg-[#323232] max-h-[calc(100vh-57px)] overflow-y-auto w-[240px]">
      {/* <div className=" inline-block w-[15%] bg-[#323232] h-[calc(100vh-57px)] overflow-auto"> */}
      {/* <Navbar /> */}
      <div className="">
        {/* overview */}
        <div className=" px-5 py-3  border-b border-stone-500">
          <NavLink to="/" className="ms-1 flex items-center mt-2 text-white">
            <span className=" text-2xl mr-2">
              <div className="flex justify-center w-7">
                <BiHomeCircle />
              </div>
            </span>
            <h1 className="text-[15px] font-semibold">Overview</h1>
          </NavLink>
        </div>
        {/* sale */}
        <div className="collapse border-b border-stone-500 rounded-none">
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex  w-[160px] px-2 justify-between items-center ">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl text-white flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BsShopWindow />
                </div>
                <h1 className=" text-[15px] font-semibold">Sales</h1>
              </span>
              <span className=" mt-3 text-white">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink to={"/sale/cashier"}>
                <li className=" text-white ml-10 mb-3">Cashier</li>
              </NavLink>
              <NavLink to={"/sale/recent"}>
                <li className=" text-white ml-10 mb-3">Recent</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* Inventory */}
        <div className="collapse border-b border-stone-500 rounded-none">
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl text-white flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BsClipboard />
                </div>
                <h1 className=" text-[15px] font-semibold">Inventory</h1>
              </span>
              <span className=" mt-3 text-white">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink to={"/products"}>
                <li className=" text-white ml-10 mb-3">Products</li>
              </NavLink>
              <NavLink to={"/products/create"}>
                <li className=" text-white ml-10 mb-3">Add Product</li>
              </NavLink>
              <NavLink to={"/stock"}>
                <li className=" text-white ml-10 mb-3">Stock Control</li>
              </NavLink>
              <NavLink to={"/brand"}>
                <li className=" text-white ml-10 mb-3">Manage Brands</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* Report */}
        <div className="collapse border-b border-stone-500 rounded-none">
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-white flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <FaChartPie />
                </div>
                <h1 className=" text-[15px] font-semibold">Report</h1>
              </span>
              <span className=" mt-3 text-white">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink to={"/stock-report"}>
                <li className=" text-white ml-10 mb-3">Stock</li>
              </NavLink>
              <NavLink to={"/sale-report"}>
                <li className=" text-white ml-10 mb-3">Sale</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* finance */}
        <div className="collapse border-b border-stone-500 rounded-none">
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-white flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BsCashCoin />
                </div>
                <h1 className=" text-[15px] font-semibold">Finance</h1>
              </span>
              <span className=" mt-3 text-white">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink to={"/daily"}>
                <li className=" text-white ml-10 mb-3">Daily</li>
              </NavLink>
              <NavLink to={"/monthly"}>
                <li className=" text-white ml-10 mb-3">Monthly</li>
              </NavLink>
              <NavLink to={"/yearly"}>
                <li className=" text-white ml-10 mb-3">Yearly</li>
              </NavLink>
              <NavLink to={"/custom"}>
                <li className=" text-white ml-10 mb-3">Custom</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* User */}
        <div className="collapse border-b border-stone-500 rounded-none">
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex justify-between w-[160px] items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-white flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <BiUserPlus className="text-2xl" />
                </div>
                <h1 className=" text-[15px] font-semibold">User</h1>
              </span>
              <span className=" mt-3 text-white">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink to={"/users"}>
                <li className=" text-white ml-10 mb-3">Overview</li>
              </NavLink>
              <Link to={"/users/create"}>
                <li className=" text-white ml-10 mb-3">Create User</li>
              </Link>
              <Link to={"/users/banned"}>
                <li className=" text-white ml-10 mb-3">Banned User</li>
              </Link>
            </ul>
          </div>
        </div>
        {/* media */}
        <div className=" px-5 py-3  border-b border-stone-500">
          <NavLink
            to={"/media"}
            className=" w-[160px] px-1 flex items-center mt-2 text-white"
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
        <div className="collapse border-b border-stone-500 rounded-none">
          <input type="checkbox" />
          <div className="collapse-title">
            <div className="flex w-[160px] justify-between items-center  px-2">
              {/* <div className="  border-b border-stone-500"> */}
              <span className=" text-xl mr-2 text-white flex items-center gap-2">
                <div className="flex justify-center w-7">
                  <FaRegUserCircle />
                </div>
                <h1 className=" text-[15px] font-semibold">Profile</h1>
              </span>
              <span className=" mt-3 text-white ">
                <BsChevronDown />{" "}
              </span>

              {/* </div> */}
            </div>
          </div>
          <div className="collapse-content">
            <ul className font-semibold="text-[15px]">
              <NavLink to={"/profile"}>
                <li className=" text-white ml-10 mb-3">My Account</li>
              </NavLink>
              <NavLink to={"/profile/edit"}>
                <li className=" text-white ml-10 mb-3">Edit</li>
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

import React from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
// import { Dropdown } from "react-daisyui";
import "../../main.jsx";
import { PiExportBold } from "react-icons/pi";
// import DatePicker from "../../components/DatePicker";
const Daily = () => {
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        {/* top */}
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-white">
              Daily
            </h1>
            <p className=" text-gray-400">Finance/ Daily</p>
          </div>
          <div className=" flex gap-3">
            {/* <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 rounded-lg text-white border border-[#FFFFFF] hover:bg-[#B19777]">
                {" "}
                Go To Shop
              </button>
            </Link> */}
            <Link to={"/products/create"}>
              <button className=" px-4 py-2 mt-1 rounded-lg flex items-center gap-2 button">
                {" "}
                {/* <AiOutlinePlus /> */}
                Go To Shop
              </button>
            </Link>
          </div>
        </div>
        {/* second */}
        <div className="flex mt-16 flex-row justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold mt-0 pt-0 text-white">
              Today Sales Overview
            </p>
          </div>
          {/* <NavLink to={"/sale/cashier"}>
            <button className="bg-base py-2 px-4 mt-1 text-white rounded-md font-semibold">
              Go to Shop
            </button>
          </NavLink> */}
          {/* dropdown  */}
          <div className="">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class=" text-gray-300 border-2 gap-2  border-secondary font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              <PiExportBold className="text-xl text-blue-400" /> Export
              <svg
                class="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* date picker */}

          {/* <div class="relative max-w-sm">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              datepicker
              datepicker-orientation="bottom right"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div> */}
          <div className="">
            {/* <DatePicker/> */}
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default Daily;

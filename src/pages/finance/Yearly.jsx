import React from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link } from "react-router-dom";

const Yearly = () => {
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        <div className=" flex justify-between">
          <div className="">
            <h1 className=" text-[20px] font-[500] text-white">Yearly</h1>
            <p className=" text-gray-500">Finance/ Yearly</p>
          </div>
          <div className=" flex gap-3">
            {/* <Link to={"/sale/cashier"}>
              <button className=" px-4 py-2 rounded-lg text-white border border-[#FFFFFF] hover:bg-[#B19777]">
                {" "}
                Go To Shop
              </button>
            </Link> */}
            <Link to={"/products/create"}>
              <button className=" px-4 py-2 rounded-lg flex items-center gap-2 button">
                {" "}
                {/* <AiOutlinePlus /> */}
                Go To Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default Yearly;

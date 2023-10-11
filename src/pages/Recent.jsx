import React from "react";
import Rootlayout from "../layout/Rootlayout";
import TodaySaleOverview from "../components/overview/TodaySaleOverview";
import { NavLink } from "react-router-dom";

const Recent = () => {
  return (
    <Rootlayout>
      <div className="p-5 flex flex-col gap-7">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-tcolor">Recent</p>
            <p>Sale/ Recent</p>
          </div>
          <NavLink to={"/sale/cashier"}>
            <button className="bg-base py-2 px-4 text-tcolor rounded-md font-semibold">
              Go to Shop
            </button>
          </NavLink>
        </div>
        <TodaySaleOverview />
      </div>
    </Rootlayout>
  );
};

export default Recent;

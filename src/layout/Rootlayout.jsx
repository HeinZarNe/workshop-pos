import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Rootlayout = ({ children }) => {
  return (
    <div className="max-h-[100vh]">
      <Navbar />
      <div className=" flex bg-[#272727]">
        <Sidebar />
        <div className="w-4/5 max-h-[calc(100vh-57px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Rootlayout;

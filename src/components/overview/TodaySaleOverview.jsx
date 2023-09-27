import React, { useState } from "react";
import DataTable from "../DataTable";
import { PiExportBold } from "react-icons/pi";
import { BiChevronDown } from "react-icons/bi";
import { BaseColor } from "../../constant";
import { Pagination } from "@mantine/core";
import { useGetOverviewDataQuery } from "../../services/authApi";

const TodaySaleOverview = () => {
  const [activePage, setPage] = useState(1);
  const token = localStorage.getItem("token");

  const { data } = useGetOverviewDataQuery({ token });
  if (data?.today_sales?.length === 0) {
    return <h1>There is currently no sales today.</h1>;
  }
  return (
    <div className={"flex flex-col gap-6 sale"}>
      <div className="flex flex-row items-center justify-between">
        <p className="text-3xl text-white">Today Sales Overview</p>
        <div className="flex felx-row items-center gap-4">
          <button className="flex flex-row items-center justify-between gap-3 bg-secondary text-white py-1 px-3 rounded-sm ">
            <div className="flex flex-row items-center gap-1">
              <PiExportBold color={BaseColor} />
              Export
            </div>
            <BiChevronDown />
          </button>
          <button className="flex flex-row items-center justify-between gap-3 bg-secondary text-white py-1 px-3 rounded-sm ">
            <PiExportBold color={BaseColor} />
            Sales Close
          </button>
        </div>
      </div>

      <DataTable />
      <div className="flex flex-row items-center justify-between bottom-section mt-10 ">
        <div className="flex flex-row items-center border rounded">
          <div className="flex flex-col items-end border-r px-6 py-2  border-white">
            <p className="text-sm text-base">Total Vouchers</p>
            <p className="text-xl font-bold text-white">1234456</p>
          </div>
          <div className="flex flex-col items-end border-r py-2 px-6  border-white">
            <p className="text-sm text-base">Total Vouchers</p>
            <p className="text-xl font-bold text-white">1234456</p>
          </div>
          <div className="flex flex-col items-end border-r px-6 py-2  border-white">
            <p className="text-sm text-base">Total Vouchers</p>
            <p className="text-xl font-bold text-white">1234456</p>
          </div>
          <div className="flex flex-col items-end border-r px-6 py-2  border-white">
            <p className="text-sm text-base">Total Vouchers</p>
            <p className="text-xl font-bold text-white">1234456</p>
          </div>
        </div>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={5}
          siblings={1}
        />
      </div>
    </div>
  );
};

export default TodaySaleOverview;

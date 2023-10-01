import React, { useState } from "react";
import DataTable from "../DataTable";
import { AiFillShop } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BaseColor } from "../../constant";
import { Button, Modal, Pagination } from "@mantine/core";
import {
  useGetOverviewDataQuery,
  useSaleCloseMutation,
} from "../../services/authApi";
import { useDisclosure } from "@mantine/hooks";
import { color } from "framer-motion";
import Swal from "sweetalert2";
const TodaySaleOverview = () => {
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const [saleClose, { isSuccess, isLoading }] = useSaleCloseMutation();
  const { data } = useGetOverviewDataQuery({ token });
  if (data?.today_sales?.length === 0) {
    return <h1>There is currently no sales today.</h1>;
  }

  const handleSaleClose = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
      timer: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = saleClose(token);

        Swal.fire("Closed!", "", "success");
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  return (
    <div className={"flex flex-col gap-6 sale"}>
      {/* <Modal opened={opened} onClose={close} title="Are You Sure?" centered>
        <div className="flex flex-row gap-5 items-center justify-center h-[100px]">
          <Button
            className=" bg-transparent text-black border border-black hover:bg-white"
            onClick={close}
          >
            No
          </Button>
          <Button variant="filled" color="red" className=" bg-red-600 ">
            Yes
          </Button>
        </div>
      </Modal> */}
      <div className="flex flex-row items-center justify-between">
        <p className="text-3xl text-white">Today Sales Overview</p>

        <button
          className="flex flex-row items-center justify-between gap-3 border border-base  text-white py-1 px-3 rounded-md "
          onClick={handleSaleClose}
        >
          <AiFillShop color={BaseColor} />
          Sale Close
        </button>
      </div>

      <DataTable data={data?.today_sales} />
      <div className="flex flex-row items-center justify-between bottom-section mt-10 ">
        <div className="flex flex-row items-center border rounded">
          <div className="flex flex-col items-end border-r px-6 py-2  border-white">
            <p className="text-md text-base">Total Vouchers</p>
            <p className="text-xl font-bold text-white">
              {data?.total_voucher}
            </p>
          </div>
          <div className="flex flex-col items-end border-r py-2 px-6  border-white">
            <p className="text-md text-base">Total Cash</p>
            <p className="text-xl font-bold text-white">{data?.total_cash}</p>
          </div>
          <div className="flex flex-col items-end border-r px-6 py-2  border-white">
            <p className="text-md text-base">Total Tax</p>
            <p className="text-xl font-bold text-white">{data?.total_tax}</p>
          </div>
          <div className="flex flex-col items-end border-r px-6 py-2  border-white">
            <p className="text-md text-base">Total</p>
            <p className="text-xl font-bold text-white"> {data?.total_net}</p>
          </div>
        </div>
        <Pagination
          value={page}
          onChange={(e) => {
            setPage(e);
          }}
          total={data?.today_sales?.last_page}
          siblings={1}
        />
      </div>
    </div>
  );
};

export default TodaySaleOverview;

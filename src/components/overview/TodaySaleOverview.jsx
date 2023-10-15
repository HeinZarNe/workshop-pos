import React, { useState } from "react";
import DataTable from "../DataTable";
import { AiFillShop } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BaseColor } from "../../constant";
import { Button, Loader, Modal, Pagination } from "@mantine/core";
import {
  useGetOverviewDataQuery,
  useGetProductToSaleQuery,
  useSaleCloseMutation,
} from "../../services/authApi";
import { useDisclosure } from "@mantine/hooks";
import { color } from "framer-motion";
import Swal from "sweetalert2";
const TodaySaleOverview = () => {
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const [saleClose, { isSuccess, isLoading }] = useSaleCloseMutation();
  const { data, isLoading: isListLoading } = useGetOverviewDataQuery({ token });

  const { data: isSaleClose, refetch } = useGetProductToSaleQuery({
    token,
  });
  const handleSaleClose = () => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes",
    //   confirmButtonColor: isSaleClose?.is_sale_close ? "green" : "red",
    //   timer: false,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     const res = saleClose(token);
    //     refetch();
    //     Swal.fire(
    //       isSaleClose?.is_sale_close ? "Opened!" : "Closed!",
    //       "",
    //       "success"
    //     );
    //   } else if (result.isDenied) {
    //     Swal.close();
    //   }
    // });

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      iconColor: "#bb86fc",
      buttonsStyling: false,
      width: "20em",
      color: "#fafafa",
      heightAuto: false,
      background: "#1E1E1E",
      focusConfirm: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      customClass: {
        cancelButton:
          "bg-primary text-secondary rounded-lg border-2 border-primary px-4 font-mono py-2",
        confirmButton:
          "bg-transparent text-primary rounded-lg border-2 border-primary px-7 font-mono py-2",
        actions: " !mt-5 !w-[100%] flex justify-center gap-9",
        icon: "!p-0",
        title: "!mt-0 !pt-0",
      },
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (isSaleClose?.is_sale_close == 1) {
        if (result.isConfirmed) {
          const res = saleClose(token);
          refetch();
          Swal.fire({
            title: "Sale Opened !",
            icon: "success",
            buttonsStyling: false,
            color: "#bb86fc",
            width: "25em",
            background: "#1e1e1e",
            customClass: {
              title: "text-primary",
              confirmButton:
                "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
            },
          });
        } else if (result.isDenied) {
          Swal.close();
        }
      } else {
        if (result.isConfirmed) {
          const res = saleClose(token);
          refetch();
          Swal.fire({
            title: "Sale Closed !",
            icon: "success",
            buttonsStyling: false,
            color: "#bb86fc",
            width: "25em",
            background: "#1e1e1e",
            customClass: {
              title: "text-primary",
              confirmButton:
                "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
            },
          });
        } else if (result.isDenied) {
          Swal.close();
        }
      }
    });
  };
  if (isListLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader variant="bars" size="xl" color={BaseColor} />
      </div>
    );
  }

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
      {data?.today_sales?.data?.length === 0 ? (
        <div className="bg-[#272727] ">
          <div className="flex justify-between gap-5 ">
            <div className="w-full flex flex-col items-center justify-center h-[50vh]">
              <div className="border border-primary px-10 py-5 w-fit gap-3   rounded-lg flex flex-col justify-center items-center">
                <p className="text-2xl font-semibold">
                  There is currently no sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-row items-center justify-between">
            <p className="text-3xl text-tcolor">Today Sales Overview</p>

            <button
              className="flex flex-row items-center justify-between gap-3 border border-primary  text-tcolor py-1 px-3 rounded-md "
              onClick={handleSaleClose}
            >
              <AiFillShop color={BaseColor} />
              {isSaleClose?.is_sale_close ? "Sale open" : "Sale Close"}
            </button>
          </div>
          <DataTable className="text-tcolor" data={data?.today_sales} />
          <div className="flex flex-row items-center justify-between bottom-section mt-10 ">
            <div className="flex flex-row items-center border rounded">
              <div className="flex flex-col items-end border-r px-6 py-2  border-tscolor">
                <p className="text-md text-primary">Total Vouchers</p>
                <p className="text-xl font-bold text-tcolor">
                  {data?.total_voucher}
                </p>
              </div>
              <div className="flex flex-col items-end border-r py-2 px-6  border-tscolor">
                <p className="text-md text-primary">Total Cash</p>
                <p className="text-xl font-bold text-tcolor">
                  {data?.total_cash}
                </p>
              </div>
              <div className="flex flex-col items-end border-r px-6 py-2  border-tscolor">
                <p className="text-md text-primary">Total Tax</p>
                <p className="text-xl font-bold text-tcolor">
                  {data?.total_tax}
                </p>
              </div>
              <div className="flex flex-col items-end border-r px-6 py-2  border-tscolor">
                <p className="text-md text-primary">Total</p>
                <p className="text-xl font-bold text-tcolor">
                  {" "}
                  {data?.total_net}
                </p>
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
        </>
      )}
    </div>
  );
};

export default TodaySaleOverview;

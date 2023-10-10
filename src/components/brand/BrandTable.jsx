import React from "react";
import { TbEdit } from "react-icons/tb";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  useDeleteBrandMutation,
  useGetBrandQuery,
} from "../../services/authApi";
import { useState } from "react";
import { useEffect } from "react";
import { Loader, Pagination } from "@mantine/core";

const BrandTable = ({
  tableData,
  page,
  dataFetch,
  setPage,
  setTableData,
  setEditBrand,
  keyword,
}) => {
  console.log(dataFetch);
  const token = localStorage.getItem("token");
  const { data, refetch, isLoading } = useGetBrandQuery({
    token,
    page,
    keyword,
  });
  const [deleteBrand] = useDeleteBrandMutation();
  useEffect(() => {
    data?.message && setTableData([]);
    data?.brands?.data && setTableData([...data?.brands?.data]);
    return () => {};
  }, [data]);

  useEffect(()=>{
    refetch();
  },[dataFetch])
  const handleTableRowDelete = async (id) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
    const res = await deleteBrand({ id, token });
    refetch();
  };

  return (
    <div>
      <div className="">
        {tableData?.length === 0 ? (
          <div className="bg-secondary ">
            <div className="flex justify-between gap-5 ">
              <div className="w-full flex flex-col items-center justify-center h-[50vh]">
                <div className="border border-base px-10 py-5 w-fit gap-3   rounded-lg flex flex-col justify-center items-center">
                  <p className="text-2xl font-semibold">There is no datas.</p>
                </div>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <Loader />
          </div>
        ) : (
          <>
            <table className="table text-tcolor bg-secondary rounded-md">
              {/* head */}
              <thead className=" text-tcolor">
                <tr>
                  <th>NO</th>
                  <th>BRAND NAME</th>
                  <th>COMPANY NAME</th>
                  <th>AGENT</th>
                  <th>PHONE</th>
                  <th>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {tableData?.map((brand) => (
                  <tr key={brand.id}>
                    <th>{brand.id}</th>
                    <td>{brand.brand_name}</td>
                    <td>{brand.company}</td>
                    <td>{brand.agent}</td>
                    <td>{brand.phone_number}</td>
                    <td>{"good"}</td>
                    <td>
                      <div className=" text-secondary flex text-[20px] gap-3">
                        <button
                          className=" bg-primary rounded-full p-2 hover:shadow-md"
                          onClick={(_) => handleTableRowDelete(brand.id)}
                        >
                          <AiOutlineMinus />
                        </button>
                        <button
                          className=" bg-primary rounded-full p-2"
                          onClick={(_) =>
                            setEditBrand({
                              state: true,
                              id: brand.id,
                            })
                          }
                        >
                          <TbEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination absolute bottom-[30px] right-[40px] ">
              <Pagination
                total={data?.brands?.last_page || 1}
                onChange={(e) => {
                  setPage(e);
                  refetch();
                }}
                boundaries={1}
                value={page || 1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrandTable;

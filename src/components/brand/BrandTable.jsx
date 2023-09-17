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
import { useDispatch } from "react-redux";
import { Loader, Pagination } from "@mantine/core";

const BrandTable = ({
  tableData,
  setTableData,
  setEditBrand,
  editBrand,
  page,
  setPage,
}) => {
  const token = localStorage.getItem("token");
  const { data, refetch, isLoading } = useGetBrandQuery({ token, page });
  const [deleteBrand] = useDeleteBrandMutation();
  useEffect(() => {
    data?.data && setTableData([...data.data]);
    return () => {};
  }, [data]);

  const handleTableRowDelete = async (id) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
    const res = await deleteBrand({ id, token });
    refetch();
  };

  return (
    <div>
      <div className="">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <Loader />
          </div>
        ) : (
          <>
            <table className="table text-white bg-[#272727] rounded-md">
              {/* head */}
              <thead className=" text-white">
                <tr>
                  <th>NO</th>
                  <th>BRAND NAME</th>
                  <th>COMPANY NAME</th>
                  <th>AGENT</th>
                  <th>PHONT</th>
                  <th>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {tableData.map((brand) => (
                  <tr key={brand.id}>
                    <th>{brand.id}</th>
                    <td>{brand.brand_name}</td>
                    <td>{brand.company}</td>
                    <td className=" text-center">{brand.agent}</td>
                    <td className=" text-center">{brand.phone_number}</td>
                    <td className=" text-center">{"good"}</td>
                    <td>
                      <div className=" text-white flex text-[20px] gap-3">
                        <button
                          className=" bg-[#B19777] rounded-full p-2 hover:shadow-md"
                          onClick={(_) => handleTableRowDelete(brand.id)}
                        >
                          <AiOutlineMinus />
                        </button>
                        <button
                          className=" bg-[#B19777] rounded-full p-2"
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
                total={data?.meta?.last_page}
                onChange={(e) => {
                  setPage(e);
                  refetch();
                }}
                onPreviousPage={(e) => {
                  setPage(page - 1);
                  refetch();
                }}
                onNextPage={(e) => {
                  setPage(page + 1);
                  refetch();
                }}
                boundaries={1}
                defaultValue={1}
                on
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrandTable;

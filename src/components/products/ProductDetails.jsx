import React, { useEffect } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { BsShopWindow } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetProductQuery, useGetUserQuery } from "../../services/authApi";
import { Loader } from "@mantine/core";
import { BaseUrl } from "../../utils/constant";

const ProductDetails = () => {
  const { state } = useLocation();
  const token = localStorage.getItem("token");
  const { data, refetch, isLoading } = useGetProductQuery({
    detailId: state?.id,
    token,
  });
  const { data: users } = useGetUserQuery({ token });
  const navigate = useNavigate();

  useEffect(() => {
    !state?.id && navigate("/products");
    state.id && refetch();
  }, [state]);
  console.log(state);
  return (
    <Rootlayout>
      {isLoading && (
        <div className="flex items-center justify-center w-full h-[300px]">
          <Loader />
        </div>
      )}
      {data && (
        <div className="mx-10 my-5">
          <div className=" flex justify-between">
            <div className="">
              <h1 className=" text-[20px] font-[500] text-white">Product</h1>
              <p className=" text-gray-500">Inventory/products/details</p>
            </div>
            <div className=" ">
              <Link to={"/products"}>
                <button className=" px-4 py-2 rounded-lg flex items-center gap-2 text-white border border-[#FFFFFF] hover:bg-[#B19777]">
                  Product List
                </button>
              </Link>
            </div>
          </div>
          <div className=" flex justify-between mt-10">
            {/* information */}
            <div className=" bg-[#]">
              <div className=" flex items-end gap-10 mt-10 mx-5">
                {/* image */}
                <div className="">
                  <img
                    className=" w-[150px] h-[150px] object-cover rounded-full"
                    src={BaseUrl + data.data.photo}
                    alt=""
                  />
                </div>
                {/* name */}
                <div className=" text-white mb-5">
                  <h1 className=" text-[22px] font-[700] tracking-wider mb-3">
                    {data.data.name}
                  </h1>
                  <div className=" text-[17px] text-stone-400 flex gap-6">
                    Sale price :{" "}
                    <p className=" text-white">{data.data.sale_price}</p>{" "}
                  </div>
                  <div className=" text-[17px] text-stone-400 flex gap-3">
                    Actual price :{" "}
                    <p className=" text-white">{data.data.actual_price}</p>{" "}
                  </div>
                </div>
              </div>
              <div className=" mt-5 px-5 py-3  border-b border-stone-500 text-white flex gap-20">
                <h1 className="text-white font-[600] text-[18px] cursor-pointer flex gap-3 items-center">
                  {" "}
                  <BsShopWindow /> Information
                </h1>
              </div>
              <div className=" text-white flex flex-col gap-6 p-5">
                <div className=" flex gap-[150px]">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Name
                  </span>
                  <span> {data.data.name}</span>
                </div>
                <div className=" flex gap-[150px]">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Brand
                  </span>
                  <span>{data.data.brand_name}</span>
                </div>
                <div className=" flex gap-[150px]">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Stock
                  </span>
                  <span> {data.data.stocks}</span>
                </div>
                <div className=" flex gap-[160px]">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Unit
                  </span>
                  <span> {data.data.unit}</span>
                </div>
                <div className=" flex gap-[50px]">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    More Information
                  </span>
                  <span> {data.data.more_information}</span>
                </div>
              </div>
            </div>
            {/* table */}
            <div className=" flex flex-col gap-10">
              {/* stock history */}
              {data?.data.stock_history.length > 0 && (
                <div className="overflow-x-auto p-2 bg-[#323232] text-white">
                  <h1 className=" font-[600] text-lg uppercase">
                    Stock history
                  </h1>
                  <table className="table">
                    {/* head */}
                    <thead className=" text-white">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Added Quantity</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {data.data.stock_history.map((item) => (
                        <tr>
                          <th>{item.id}</th>
                          <td>
                            {
                              users?.data.find(
                                (user) => user.id === item.user_id
                              ).name
                            }
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.created_at || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* sale history */}
              {data?.data.sale_history?.length > 0 && (
                <div className="overflow-x-auto bg-[#323232] p-2 text-white">
                  <h1 className=" font-[600] text-lg uppercase">
                    Sale History
                  </h1>
                  <table className="table">
                    {/* head */}
                    <thead className=" text-white">
                      <tr>
                        <th>No</th>
                        <th>Sale Price</th>
                        <th>Sale Quantity</th>
                        <th>Sale Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {data.data.sale_history.map((item) => (
                        <tr>
                          <th>{item.id}</th>
                          <td>{item.sale_price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.sale_date || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Rootlayout>
  );
};

export default ProductDetails;

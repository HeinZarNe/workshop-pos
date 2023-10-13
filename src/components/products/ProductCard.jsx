import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../services/authApi";
import { Pagination } from "@mantine/core";
import milk from "../../pages/m.png";

const ProductCard = ({ keyword, page }) => {
  const token = localStorage.getItem("token");
  const { data, refetch } = useGetProductQuery({ token, page, keyword });

  return (
    <div>
      <div className="flex flex-row flex-wrap items-center rounded-md gap-5">
        {data?.data?.map((item) => {
          return (
            <div className="w-[30%] hover:scale-105 border-2 border-gray-600 hover:border-primary duration-150 bg-secondary overflow-hidden rounded-lg  ">
              <Link to={"/products/details"} state={{ id: item.id }}>
                {item.photo ? (
                  <img
                    className=" w-full h-[230px]  object-cover"
                    src={item.photo}
                    alt=""
                  />
                ) : (
                  <img
                    className=" w-full h-[230px]  object-cover"
                    src={milk}
                    alt=""
                  />
                )}
              </Link>
              <div className=" text-tcolor text-right px-3 py-4">
                <h1 className="text-xl text-primary font-semibold">
                  {item.name}
                </h1>
                <p className="text-tscolor">{item.price} kyats</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;
{
  /* */
}

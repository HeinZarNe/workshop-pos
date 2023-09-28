import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../services/authApi";
import { Pagination } from "@mantine/core";

const ProductCard = ({ keyword, page }) => {
  const token = localStorage.getItem("token");
  const { data, refetch } = useGetProductQuery({ token, page, keyword });

  return (
    <div>
      <div className="flex flex-row flex-wrap items-center gap-5">
        {data?.data?.map((item) => {
          return (
            <div className=" flex-1 bg-stone-700 rounded-md">
              <Link to={"/products/details"} state={{ id: item.id }}>
                <img
                  className=" w-full h-[150px] object-cover"
                  src={item.photo}
                  alt=""
                />
              </Link>
              <div className=" text-white text-right px-3 py-4">
                <h1>{item.name}</h1>
                <p>{item.price} kyats</p>
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

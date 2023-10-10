import React from "react";
import { TbEdit } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const StockTable = ({ stocksData }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-tcolor bg-secondary rounded-md">
          {/* head */}
          <thead className=" text-tcolor">
            <tr>
              <th>NO</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {stocksData?.data?.map((item) => (
              <tr>
                <th>{item.id}</th>
                <td>{item.product_name}</td>
                <td>{item.brand_name}</td>
                <td>{item.quantity}</td>

                {/* <td>
                  <div className=" text-tcolor flex text-[20px] gap-3">
                    <button className=" bg-[#B19777] rounded-full p-2">
                      <AiOutlinePlus />
                    </button>
                    <button className=" bg-[#B19777] rounded-full p-2">
                      <TbEdit />
                    </button>
                    <Link to={"/product/details"}>
                      <button className=" bg-[#B19777] rounded-full p-2">
                        <BsArrowRight />
                      </button>
                    </Link>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;

import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { useGetProductQuery } from "../../services/authApi";
import { Link } from "react-router-dom";
import AddProduct from "../../pages/AddProduct";
import { Pagination } from "@mantine/core";

const ProductTables = ({
  setShowSidebar,
  addStock,
  setStockData,
  data,
  refetch,
}) => {
  // useEffect(() => {
  //   refetch();
  //   // return () => {};
  // }, [addStock]);

  // const h = useGetProductQuery({ token, page, keyword });
  // console.log(h);
  const [editstate, setEditState] = useState(false);

  return (
    <div>
      {editstate ? (
        <AddProduct editState={editstate} setEditState={setEditState} />
      ) : (
        <div className="overflow-x-auto">
          <table className="table text-tcolor mt-5 bg-transparent rounded-md">
            {/* head */}
            <thead className=" text-tcolor">
              <tr>
                <th>NO</th>
                <th>NAME</th>
                <th>BRAND</th>
                <th>UNIT</th>
                <th>SALE PRICE</th>
                <th>TOTAL STOCK</th>
                <th>ACTION BUTTONS</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {Array.isArray(data?.data) &&
                data.data.map((item, i) => (
                  <tr key={i}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.brand_name}</td>
                    <td className=" text-center">{item.unit}</td>
                    <td className=" text-center">{item.price}</td>
                    <td className=" text-center">{item.stocks}</td>
                    <td>
                      <div className=" text-tcolor flex text-[20px] gap-3">
                        <button
                          className=" bg-primary text-secondary rounded-full p-2"
                          onClick={() => {
                            setShowSidebar(true);
                            setStockData({ id: item.id });
                          }}
                        >
                          <AiOutlinePlus />
                        </button>
                        <button
                          className=" bg-primary text-secondary rounded-full p-2"
                          onClick={() => setEditState(item)}
                        >
                          <TbEdit />
                        </button>
                        <Link to={"/products/details"} state={{ id: item.id }}>
                          <button className=" bg-primary text-secondary rounded-full p-2">
                            <BsArrowRight />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductTables;

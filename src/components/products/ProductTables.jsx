import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { useGetProductQuery } from "../../services/authApi";
import { Link } from "react-router-dom";
import AddProduct from "../../pages/AddProduct";
import { Pagination } from "@mantine/core";

const ProductTables = ({ setShowSidebar, addStock, setStockData }) => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const { data, refetch } = useGetProductQuery({ token, page });
  const [editstate, setEditState] = useState(false);
  useEffect(() => {
    refetch();

    return () => {};
  }, [addStock]);

  return (
    <div>
      {editstate ? (
        <AddProduct editState={editstate} setEditState={setEditState} />
      ) : (
        <div className="overflow-x-auto">
          <table className="table text-white bg-[#272727] rounded-md">
            {/* head */}
            <thead className=" text-white">
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
                      <div className=" text-white flex text-[20px] gap-3">
                        <button
                          className=" bg-[#B19777] rounded-full p-2"
                          onClick={() => {
                            setShowSidebar(true);
                            setStockData({ id: item.id });
                          }}
                        >
                          <AiOutlinePlus />
                        </button>
                        <button
                          className=" bg-[#B19777] rounded-full p-2"
                          onClick={() => setEditState(item)}
                        >
                          <TbEdit />
                        </button>
                        <Link to={"/product/details"}>
                          <button className=" bg-[#B19777] rounded-full p-2">
                            <BsArrowRight />
                          </button>
                        </Link>
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
        </div>
      )}
    </div>
  );
};

export default ProductTables;

import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

import { Link } from "react-router-dom";

import { Pagination } from "@mantine/core";
import {
  useGetBannedUserQuery,
  useUnbanUserMutation,
} from "../services/authApi";
import Swal from "sweetalert2";

const BannedTables = ({ keyword }) => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const { data, refetch } = useGetBannedUserQuery({ token, page, keyword });
  const [unbanUser] = useUnbanUserMutation();
  return (
    <div>
      <div className="overflow-x-auto">
        {data?.length > 0 ? (
          <table className="table text-white bg-[#272727] rounded-md">
            {/* head */}
            <thead className=" text-white">
              <tr>
                <th>NO</th>
                <th>NAME</th>
                <th>POSITION</th>
                <th>EMAIL</th>
                <th>ACTION BUTTONS</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {Array.isArray(data) &&
                data.map((item, i) => (
                  <tr key={i}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td className="">{item.position}</td>
                    <td>{item.email}</td>

                    <td>
                      <button
                        className=" bg-[#B19777] rounded-md p-2"
                        onClick={(_) => {
                          unbanUser({ token, id: item.id });
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "User has been unbanned!",

                            allowOutsideClick: true,
                          });
                        }}
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <span>There is currently no data</span>
        )}
      </div>
    </div>
  );
};

export default BannedTables;

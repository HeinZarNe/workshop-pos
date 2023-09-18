import React, { useState } from "react";
import { Table } from "@mantine/core";
import { useGetUserQuery } from "../services/authApi";
import { AiOutlineMinus } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { BsArrowRight } from "react-icons/bs";

const UserTable = ({ users, banUser, setOpenModal }) => {
  const rows = users?.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.position}</td>
      <td>{element.email}</td>
      <td>
        <div className=" text-white flex text-[20px] gap-3">
          <button
            className=" bg-[#B19777] rounded-full p-2"
            onClick={(_) => banUser(element.id)}
          >
            <AiOutlineMinus />
          </button>
          <button className=" bg-[#B19777] rounded-full p-2">
            <TbEdit />
          </button>

          <button
            className=" bg-[#B19777] rounded-full p-2"
            onClick={(_) => setOpenModal({ state: true, id: element.id })}
          >
            <BsArrowRight />
          </button>
        </div>
      </td>
    </tr>
  ));
  const head = {};
  return (
    <Table
      withBorder
      highlightOnHover
      style={{ color: "white", width: "100%" }}
    >
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Position</th>
          <th>Email</th>
          <th>Action Buttons</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default UserTable;

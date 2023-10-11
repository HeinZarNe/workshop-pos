import React, { useState } from "react";
import { Table } from "@mantine/core";
import { useGetUserQuery } from "../services/authApi";
import { AiOutlineMinus } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { BsArrowRight } from "react-icons/bs";
import EditUser from "../pages/EditUser";
import Swal from "sweetalert2";

const UserTable = ({ users, banUser, refetch, setOpenModal }) => {
  const [editState, setEditState] = useState({ state: false });
  const handleEditCancle = () => {
    setEditState({ state: false });
    refetch();
  };
  const rows = users?.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.position}</td>
      <td>{element.email}</td>
      <td>
        <div className=" text-secondary flex text-[20px] gap-3">
          <button
            className=" bg-primary rounded-full p-2"
            onClick={(_) => {
              banUser(element.id);
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User has been banned!",

                allowOutsideClick: true,
              });
            }}
          >
            <AiOutlineMinus />
          </button>
          <button
            className=" bg-primary rounded-full p-2"
            onClick={(_) => setEditState({ state: true, id: element.id })}
          >
            <TbEdit />
          </button>

          <button
            className=" bg-primary rounded-full p-2"
            onClick={(_) => setOpenModal({ state: true, id: element.id })}
          >
            <BsArrowRight />
          </button>
        </div>
      </td>
    </tr>
  ));
  if (editState.state) {
    return <EditUser id={editState.id} setEditState={handleEditCancle} />;
  } else {
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
  }
};

export default UserTable;

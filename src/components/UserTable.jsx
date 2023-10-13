import React, { useState } from "react";
import { Table } from "@mantine/core";
import { useGetUserQuery } from "../services/authApi";
import { AiOutlineMinus } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { BsArrowRight } from "react-icons/bs";
import EditUser from "../pages/EditUser";
import Swal from "sweetalert2";

const UserTable = ({ users, banUser, refetch, setOpenModal }) => {
  // const del = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     icon: "warning",
  //     iconColor: "#bb86fc",
  //     buttonsStyling: false,
  //     width: "20em",
  //     color: "#fafafa",
  //     heightAuto: false,
  //     background: "#1E1E1E",
  //     focusConfirm: true,
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     customClass: {
  //       cancelButton:
  //         "bg-primary text-secondary rounded-lg border-2 border-primary px-4 font-mono py-2",
  //       confirmButton:
  //         "bg-transparent text-primary rounded-lg border-2 border-primary px-7 font-mono py-2",
  //       // htmlContainer: '!pb-0',
  //       actions: " !mt-5 !w-[100%] flex justify-center gap-9",
  //       icon: "!p-0",
  //       title: "!mt-0 !pt-0",
  //     },
  //     confirmButtonText: "Yes",
  //   }).then(async (result) => {

  //     if (result.isConfirmed) {
  //       banUser(element.id);
  //       refetch();
  //       // const data = await logout(token);
  //       Swal.fire({
  //         title: "Successfully Banned !",
  //         buttonsStyling: false,
  //         color: "#bb86fc",
  //         width: "25em",
  //         background: "#1e1e1e",
  //         customClass: {
  //           title: "text-primary",
  //           // htmlContainer: 'bg-secondary',
  //           // action: '!mt-2',
  //           confirmButton:
  //             "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
  //         },
  //       });
  //     //   // if (data) {
  //     //   //   dispatch(removeUser());
  //     //   //   navigate("/login");
  //     //   // }
  //     }
  //   });
  // };
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
              Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                iconColor: "#bb86fc",
                buttonsStyling: false,
                width: "20em",
                color: "#fafafa",
                heightAuto: false,
                background: "#1E1E1E",
                focusConfirm: true,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                customClass: {
                  cancelButton:
                    "bg-primary text-secondary rounded-lg border-2 border-primary px-4 font-mono py-2",
                  confirmButton:
                    "bg-transparent text-primary rounded-lg border-2 border-primary px-7 font-mono py-2",
                  actions: " !mt-5 !w-[100%] flex justify-center gap-9",
                  icon: "!p-0",
                  title: "!mt-0 !pt-0",
                },
                confirmButtonText: "Yes",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  banUser(element.id);
                  refetch();
                  Swal.fire({
                    title: "Successfully Banned !",
                    icon: "success",
                    buttonsStyling: false,
                    color: "#bb86fc",
                    width: "25em",
                    background: "#1e1e1e",
                    customClass: {
                      title: "text-primary",
                      // htmlContainer: 'bg-secondary',
                      // action: '!mt-2',
                      confirmButton:
                        "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
                    },
                  });
                }
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

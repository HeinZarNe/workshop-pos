import React, { useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import InfoTab from "./InfoTab";
import { Card, Modal } from "flowbite-react";
import Admin from "../assets/images/admin.jpg";
import "./UserOverview.css";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import {
  useBanUserMutation,
  useGetUserDetailQuery,
  useGetUserQuery,
} from "../services/authApi";
import UserTable from "./UserTable";
import { Loader, Pagination } from "@mantine/core";

const UserOverview = () => {
  const token = localStorage.getItem("token");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("");
  const [openModal, setOpenModal] = useState({ state: false, id: 0 });

  const {
    data: users,
    refetch,
    isLoading,
  } = useGetUserQuery({ token, keyword, page });
  const { data: userDetail, isLoading: detailLoading } = useGetUserDetailQuery({
    token,
    id: openModal.id,
  });
  const [banUser, { isSuccess, isError }] = useBanUserMutation();
  const toggleModal = () => {
    setOpenModal(!openModal.state);
  };
  const handleBanUser = (id) => {
    const res = banUser({ token, id });
  };
  const handleTabClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div>
      <div className="flex justify-between mx-5 mt-5">
        <div className="">
          <h1 className="text-2xl text-[#B19777]">Users</h1>
          <p className="text-white">Users / Overview</p>
        </div>
        <Link to={"/users/create"}>
          <button className=" py-2 px-4 rounded-lg button">Create User</button>
        </Link>
      </div>

      <div className=" p-5 text-white flex flex-col gap-3">
        <h1 className="text-[21px] font-[500] text-white">Staff Overview</h1>
        <div className="flex flex-row items-center gap-3">
          <div className="relative my-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              id="default-search"
              className="block w-[300px] p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-[#272727]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search ..."
              required
            />
          </div>
        </div>
        {isLoading ? (
          <div className="w-full flex h-[300px] justify-center ">
            {" "}
            <Loader variant="bars" />{" "}
          </div>
        ) : (
          <UserTable
            refetch={refetch}
            users={users?.data}
            setOpenModal={setOpenModal}
            banUser={handleBanUser}
          />
        )}

        <div className="pagination ">
          <Pagination
            total={users?.last_page || 1}
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

        <Modal show={openModal.state} onClose={toggleModal}>
          <div className="bg-red">
            {detailLoading ? (
              <div className="w-full flex items-center justify-center h-[300px]">
                <Loader variant="bars" />
              </div>
            ) : (
              userDetail && (
                <>
                  <Modal.Header style={{ backgroundColor: "#323232" }}>
                    <div className="flex items-center gap-5">
                      <img
                        src={userDetail.data.photo}
                        alt="admin"
                        className=" h-[150px] w-[150px] rounded-full"
                      />
                      <div className=" text-[#B19777]">
                        <h2 className="text-3xl mb-2">
                          {userDetail.data.name}
                        </h2>
                        <p className=" text-gray-300 text-sm">
                          {userDetail.data.position}
                        </p>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundColor: "#323232" }}>
                    <InfoTab
                      onTabClick={handleTabClick}
                      detail={userDetail.data}
                    />
                  </Modal.Body>
                </>
              )
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserOverview;

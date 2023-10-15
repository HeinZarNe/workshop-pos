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
  const [section, setSection] = useState("personal");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("");
  const [openModal, setOpenModal] = useState({ state: false, id: 0 });
  const [another, setAnother] = useState(true);
  const {
    data: users,
    refetch,
    isLoading,
  } = useGetUserQuery({ token, keyword, page });
  const {
    data: userDetail,
    isLoading: detailLoading,
    refetch: refetchDetail,
  } = useGetUserDetailQuery({
    token,
    id: openModal?.id,
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

  return isLoading ? (
    <div className="w-full flex h-[100vh] justify-center ">
      <Loader variant="bars" size="xl" color="#bb86fc" />{" "}
    </div>
  ) : another ? (
    <div>
      <div className="flex justify-between mx-5 mt-5">
        <div className="">
          <h1 className="text-2xl text-primary">Users</h1>
          <p className="text-tcolor">Users / Overview</p>
        </div>
        <Link to={"/users/create"}>
          <button className=" py-2 px-4 rounded-lg button">Create User</button>
        </Link>
      </div>

      <div className=" p-5 text-tcolor flex flex-col gap-3">
        <h1 className="text-[21px] font-[500] text-tcolor">Staff Overview</h1>
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
              className="block w-[300px] p-2 pl-10 text-sm text-tcolor border border-gray-600 rounded-lg bg-[#272727]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-tcolor"
              placeholder="Search ..."
              required
            />
          </div>
        </div>
        <UserTable
          refetch={refetch}
          users={users?.data}
          setAnother={setAnother}
          setOpenModal={(e) => {
            setOpenModal(e);
            refetchDetail();
          }}
          banUser={handleBanUser}
        />

        <div className="pagination ">
          <Pagination
            total={users?.last_page || 1}
            onChange={(e) => {
              setPage(e);
              refetch();
            }}
            boundaries={1}
            defaultValue={1}
            on
          />
        </div>

        {/* <Modal show={openModal.state} onClose={toggleModal}>
          <div>
            {detailLoading ? (
              <div className="w-full flex items-center justify-center h-[300px]">
                <Loader variant="bars" color="#bb86fc" />
              </div>
            ) : (
              userDetail && (
                <>
                  <Modal.Header style={{ backgroundColor: "#323232" }}>
                    <div className="flex items-center gap-5">
                      <img
                        src={userDetail?.data?.photo}
                        alt="admin"
                        className=" h-[150px] w-[150px] rounded-full"
                      />
                      <div className=" text-[#BB86FC]">
                        <h2 className="text-3xl mb-2">
                          {userDetail?.data?.name}
                        </h2>
                        <p className=" text-gray-300 text-sm">
                          {userDetail?.data?.position}
                        </p>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundColor: "#323232" }}>
                    <InfoTab
                      onTabClick={handleTabClick}
                      detail={userDetail?.data}
                    />
                  </Modal.Body>
                </>
              )
            )}
          </div>
        </Modal> */}
        {/* {another && ( */}
        {/* )} */}
      </div>
    </div>
  ) : (
    <div className=" mx-10 my-5">
      {/* header */}
      <div className="flex justify-between">
        <h1 className=" text-2xl ms-3 mt-2 font-semibold text-white">
          Profile details
        </h1>
        <div
          className="px-5 py-2 rounded-md font-semibold bg-primary text-secondary"
          onClick={() => setAnother(true)}
        >
          BACK
        </div>
      </div>
      <div className=" flex items-end gap-10 mt-10 mx-5">
        {/* image */}
        <div className="">
          <img
            className=" w-[150px] h-[150px] object-cover rounded-full"
            src={userDetail?.data?.photo}
            alt=""
          />
        </div>
        {/* name */}
        <div className=" text-white mb-5">
          <h1 className=" text-[22px] font-[700] tracking-wider">
            {userDetail?.data?.name}
          </h1>
          <span className=" text-[15px] text-stone-400">
            {userDetail?.data?.position}
          </span>
          <div className=" text-white text-xl flex gap-4 mt-5">
            {/* <BsTelephoneForward /> */}
            {/* <BiMessageAltMinus className=" text-2xl" /> */}
          </div>
        </div>
      </div>
      {/* section */}
      <div className=" w-[400px] my-5 justify-between items-center relative">
        <div className=" px-5 py-3  border-b border-stone-500 text-white flex gap-20">
          <h1
            onClick={() => setSection("personal")}
            className={`${
              section === "personal"
                ? "text-[#BB86FC] select-none font-[600] text-[18px] cursor-pointer"
                : "text-white font-[600] text-[18px] cursor-pointer"
            }`}
          >
            Personal
          </h1>
          <h1
            onClick={() => setSection("login")}
            className={`${
              section === "login"
                ? "text-[#BB86FC] select-none font-[600] text-[18px] cursor-pointer"
                : "text-white font-[600] text-[18px] cursor-pointer"
            }`}
          >
            Login Information
          </h1>
        </div>
        {/* <div className="absolute right-[100px] top-[-5px]">
                <Link to={"/profile/edit"}>
                  <button className=" px-4 py-2 rounded-lg flex items-center gap-2 button">
                    {" "}
                    <TbEdit /> Edit Profile
                  </button>
                </Link>
              </div> */}
      </div>
      {/* personal */}
      {section === "personal" ? (
        <div className=" text-white flex flex-col gap-6 p-5">
          <div className=" flex gap-20">
            <span className=" text-[17px] text-stone-300 font-bold">
              Date Of birth
            </span>
            <span> {userDetail?.data?.date_of_birth}</span>
          </div>
          <div className=" flex gap-32">
            <span className=" text-[17px] text-stone-300 font-bold">
              Gender
            </span>
            <span> {userDetail?.data?.gender}</span>
          </div>
          <div className=" flex gap-[122px]">
            <span className=" text-[17px] text-stone-300 font-bold">
              Address
            </span>
            <span> {userDetail?.data?.address}</span>
          </div>
        </div>
      ) : (
        <div className=" text-white flex flex-col gap-6 p-5">
          <div className=" flex gap-32">
            <span className=" text-[17px] text-stone-300 font-bold">Phone</span>
            <span> {userDetail?.data?.phone_number}</span>
          </div>
          <div className=" flex gap-28">
            <span className=" text-[17px] text-stone-300 font-bold">
              Position
            </span>
            <span> {userDetail?.data?.position}</span>
          </div>
          <div className=" flex gap-36">
            <span className=" text-[17px] text-stone-300 font-bold">Mail</span>
            <span> {userDetail?.data?.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOverview;

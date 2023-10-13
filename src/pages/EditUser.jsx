import React, { useEffect, useRef, useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonBoundingBox } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import {
  useCreateUserMutation,
  useGetPhotoQuery,
  useGetUserDetailQuery,
  useUpdateUserMutation,
} from "../services/authApi";
import ModalPhoto from "../components/ModalPhoto";
import { HiOutlinePhoto } from "react-icons/hi2";
import { BaseUrl } from "../utils/constant";
import InfoTab from "../components/InfoTab";
import Swal from "sweetalert2";
import "./EditUser.css";

const EditUser = ({ id, setEditState }) => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const [section, setSection] = useState("personal");
  const [selectedGenders, setSelectedGenders] = useState("male");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: userDetail } = useGetUserDetailQuery({ token, id: id });

  useEffect(() => {
    if (!userDetail?.data) return;
    const { name, phone_number, date_of_birth, gender, address, photo } =
      userDetail.data;
    setSelectedPhoto(photo);
    setName(name);
    setSelectedGenders(gender);
    setPhone_number(phone_number);
    setDateOfBirth(date_of_birth);
    setAddress(address);

    return () => {};
  }, [userDetail]);

  const handleCheckboxChange = (value) => {
    setSelectedGenders(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      const userData = {
        id,
        name,
        phone_number,
        date_of_birth,
        gender: selectedGenders,
        address,
        photo: selectedPhoto.url,
      };
      const res = updateUser({ updateData: userData, token });
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "User has been updated!",
        showConfirmButton: true,

        confirmButtonText: "Go to User",
        preConfirm: () => {
          setEditState();
        },
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div className="edit-user">
      <div className="flex justify-between mx-5 mt-5">
        <div className="">
          <h1 className="text-2xl text-[#BB86FC]">Users</h1>
          <p className="text-white">Users / Create</p>
        </div>
        <div onClick={setEditState}>
          <button className=" py-2 px-4 rounded-lg button">Users</button>
        </div>
      </div>
      <div className="mt-5 flex gap-16 items-center">
        {section === "personal" && (
          <form
            onSubmit={() => setSection("photo")}
            action=""
            className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
          >
            <div className=" text-white flex flex-col gap-8 p-5">
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Name
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  type="text"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Phone
                </span>
                <input
                  required
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  placeholder="Phone"
                  type="text"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Date Of Birth
                </span>
                <input
                  required
                  value={date_of_birth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  placeholder="date of birth"
                  type="date"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm text-slate-400 focus:outline-none focus:border-[#BB86FC] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Gender
                </span>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-black h-5 w-5"
                    value="male"
                    set
                    checked={selectedGenders === "male"}
                    onChange={() => handleCheckboxChange("male")}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    value="female"
                    checked={selectedGenders === "female"}
                    onChange={() => handleCheckboxChange("female")}
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Address
                </span>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  name=""
                  placeholder="Address"
                  className="mt-1 block w-2/3 p-4 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px] placeholder:text-[17px]"
                  id=""
                  cols="10"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className=" self-end py-2 px-4 rounded-lg button w-24 m-5"
            >
              Next
            </button>
          </form>
        )}

        {section === "photo" && (
          <div className="w-[550px] bg-[#323232] rounded-lg ml-5 ">
            {showPhotoModal ? (
              <ModalPhoto
                selectedPhoto={selectedPhoto}
                setSelectedPhoto={setSelectedPhoto}
                setShowPhotoModal={setShowPhotoModal}
                showPhotoModal={showPhotoModal}
              />
            ) : (
              ""
            )}
            <div
              onClick={() => setShowPhotoModal(!showPhotoModal)}
              className="flex flex-col items-center p-5"
            >
              <h4 className="text-lg text-white mb-6">Upload Photo</h4>
              <div className="mb-6 relative w-[180px] h-[180px] rounded-full border-2 border-dashed border-[#BB86FC] bg-[#272727] flex justify-center items-center">
                {selectedPhoto ? (
                  <img
                    src={
                      !selectedPhoto.url
                        ? selectedPhoto
                        : selectedPhoto.url || ""
                    }
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                    className="rounded-full h-[177px] aspect-square "
                  />
                ) : (
                  <HiOutlinePhoto className="text-6xl" />
                )}
                <button className="button w-8 h-8 rounded-full absolute flex justify-center items-center translate-x-14 translate-y-16">
                  <RiEdit2Fill />
                </button>
              </div>
            </div>

            {selectedPhoto && (
              <div className="p-5 flex justify-between items-center">
                <button className=" border border-stone-400 py-2 px-4 rounded-lg mt-5">
                  Clear Photo
                </button>
                <button
                  className=" border button border-stone-400 py-2 px-4 rounded-lg mt-5"
                  onClick={(_) => setSection("preview")}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
        {section === "preview" && (
          <div className="w-[550px] bg-[#323232] rounded-lg ml-5 p-5 relative">
            <div
              className=" right-5 cursor-pointer top-5 button w-8 h-8 rounded-full absolute flex justify-center items-center  "
              onClick={(_) => setSection("personal")}
            >
              <RiEdit2Fill />
            </div>
            <div className="flex items-center gap-5 px-5 py-3">
              <img
                src={selectedPhoto.url || selectedPhoto}
                alt="admin"
                className=" h-[150px] w-[150px] rounded-full"
              />
              <div className=" text-[#BB86FC]">
                <h2 className="text-3xl mb-2">{name}</h2>
              </div>
            </div>
            <InfoTab
              edit={true}
              detail={{
                phone_number,
                date_of_birth,
                gender: selectedGenders,
                address,
              }}
            />
          </div>
        )}
        <div className="">
          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-14 bg-[#323232] flex justify-center items-center rounded-full border ${
                section === "personal"
                  ? "border-[#BB86FC] text-[#BB86FC]"
                  : "border-white text-white"
              }`}
            >
              1
            </div>
            <p
              className={` ${
                section === "personal" ? "text-[#BB86FC]" : "text-white"
              }`}
            >
              Personal
            </p>
          </div>
          <div className="bg-[#BB86FC] w-[1px] h-[80px] ml-[28px] my-2"></div>
          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-14 bg-[#323232] flex justify-center items-center rounded-full border ${
                section === "login"
                  ? "border-[#BB86FC] text-[#BB86FC]"
                  : "border-white text-white"
              }`}
            >
              2
            </div>
            <p
              className={` ${
                section === "login" ? "text-[#BB86FC]" : "text-white"
              }`}
            >
              Photo
            </p>
          </div>

          <div className="bg-[#BB86FC] w-[1px] h-[80px] ml-[28px] my-2"></div>

          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-14 bg-[#323232] flex justify-center items-center rounded-full border ${
                section === "photo"
                  ? "border-[#BB86FC] text-[#BB86FC]"
                  : "border-white text-white"
              }`}
            >
              3
            </div>
            <p
              className={` ${
                section === "photo" ? "text-[#BB86FC]" : "text-white"
              }`}
            >
              Preview
            </p>
          </div>
        </div>
        {section === "preview" && (
          <button
            onClick={handleSubmit}
            className=" py-2 px-4 rounded-lg button mt-5"
          >
            Update User
          </button>
        )}
      </div>
    </div>
  );
};

export default EditUser;

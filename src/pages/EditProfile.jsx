import React, { useEffect, useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { BiMessageAltMinus } from "react-icons/bi";
import { BsTelephoneForward } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import {
  useGetUserDetailQuery,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "../services/authApi";
import { Loader } from "@mantine/core";
import Swal from "sweetalert2";
import ModalPhoto from "../components/ModalPhoto";

const EditProfile = () => {
  const [section, setSection] = useState("personal");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [canUpdatePassword, setCanUpdatePassword] = useState(false);
  const handleCheckboxChange = (value) => {
    setSelectedGenders(value);
  };
  const token = localStorage.getItem("token");
  const [newData, setNewData] = useState({});
  const {
    data: profile,
    isLoading,
    refetch,
  } = useGetUserDetailQuery({
    token,
    self: true,
  });

  const {
    address,
    date_of_birth,
    email,
    gender,
    id,
    name,
    phone_number,
    photo,
    position,
  } = profile?.data || {};
  const [updateUser, { isSuccess, isLoading: updating }] =
    useUpdateUserMutation();

  const [updatePassword] = useUpdatePasswordMutation();

  useEffect(() => {
    profile?.data && setSelectedGenders(profile.data.gender);
  }, [profile]);

  useEffect(() => {
    isSuccess &&
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Information has been updated",

        allowOutsideClick: true,
      });
    isSuccess && refetch();
  }, [isSuccess]);

  useEffect(() => {
    updating &&
      Swal.fire({
        position: "center",
        title: "LOADING...",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
  }, [updating]);

  useEffect(() => {
    const { new_password, confirm_password, current_password } = newData;

    if (
      [new_password, confirm_password, current_password].every(
        (item) => item?.length > 7
      ) &&
      new_password === confirm_password
    ) {
      setCanUpdatePassword(true);
    } else {
      setCanUpdatePassword(false);
    }
  }, [
    newData.new_password,
    newData.confirm_password,
    newData.current_password,
  ]);

  const handleFileChange = (key, value) => {
    setNewData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setNewData({});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const dataToUpdate = {
      id: id,
      name: newData.name?.length > 0 ? newData.name : name,
      phone_number:
        newData.phone_number?.length > 0 ? newData.phone_number : phone_number,
      address: newData.address?.length > 0 ? newData.address : address,
      date_of_birth:
        newData.date_of_birth?.length > 0
          ? newData.date_of_birth
          : date_of_birth,
      email: newData.email?.length > 0 ? newData.email : email,
      gender: newData.gender?.length > 0 ? newData.gender : gender,
      photo: selectedPhoto
        ? selectedPhoto.path
        : newData.photo?.length > 0
        ? newData.photo
        : photo,
      position: newData.position?.length > 0 ? newData.position : position,
    };
    updateUser({ token, updateData: dataToUpdate });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!canUpdatePassword) return;
    const { confirm_password, new_password, current_password } = newData || {};
    const data = updatePassword({
      token,
      data: {
        new_password_confirmation: confirm_password,
        new_password,
        current_password,
      },
    });
  };

  return (
    <Rootlayout>
      {isLoading && (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {profile && (
        <div className=" mx-10 my-5">
          {showPhotoModal && (
            <ModalPhoto
              selectedPhoto={selectedPhoto}
              setSelectedPhoto={setSelectedPhoto}
              showPhotoModal={showPhotoModal}
              setShowPhotoModal={setShowPhotoModal}
            />
          )}
          {/* header */}
          <h1 className=" text-[20px] font-[500] text-white">Edit Profile</h1>
          <div className=" flex items-end gap-10 mt-10 mx-5">
            {/* image */}
            <div className="" onClick={(_) => setShowPhotoModal(true)}>
              <img
                className=" w-[150px] h-[150px] object-cover rounded-full"
                src={selectedPhoto ? selectedPhoto.url : photo}
                alt=""
              />
            </div>
            {/* name */}
            <div className=" text-white mb-5">
              <h1 className=" text-[22px] font-[700] tracking-wider">{name}</h1>
              <span className=" text-[15px] text-stone-400">{position}</span>
            </div>
          </div>
          {/* section */}
          <div className=" w-[900px] my-5 justify-between items-center">
            <div className=" px-5 py-3  border-b border-stone-500 text-white flex gap-20">
              <h1
                onClick={() => setSection("personal")}
                className={`${
                  section === "personal"
                    ? "text-[#B19777] select-none font-[600] text-[18px] cursor-pointer"
                    : "text-white font-[600] text-[18px] cursor-pointer"
                }`}
              >
                Personal
              </h1>
              <h1
                onClick={() => setSection("login")}
                className={`${
                  section === "login"
                    ? "text-[#B19777] select-none font-[600] text-[18px] cursor-pointer"
                    : "text-white font-[600] text-[18px] cursor-pointer"
                }`}
              >
                Login Information
              </h1>
              <h1
                onClick={() => setSection("password")}
                className={`${
                  section === "password"
                    ? "text-[#B19777] select-none font-[600] text-[18px] cursor-pointer"
                    : "text-white font-[600] text-[18px] cursor-pointer"
                }`}
              >
                Password
              </h1>
            </div>
          </div>
          {/* personal */}
          {section === "personal" && (
            <form action="">
              <div className=" text-white flex flex-col gap-8 p-5">
                <div className=" flex gap-32 items-center">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Name
                  </span>
                  <input
                    required
                    value={"name" in newData ? newData.name : name}
                    onChange={(e) => handleFileChange("name", e.target.value)}
                    placeholder="Name"
                    type="text"
                    className="mt-1 block w-1/2 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>

                <div className=" flex gap-[70px] items-center">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Date Of Birth
                  </span>
                  <input
                    required
                    value={
                      "date_of_birth" in newData
                        ? newData.date_of_birth
                        : date_of_birth
                    }
                    onChange={(e) =>
                      handleFileChange("date_of_birth", e.target.value)
                    }
                    placeholder="Date Of Birth"
                    type="date"
                    className="mt-1 block w-1/2 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex gap-[120px] items-center">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Gender
                  </span>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-black h-5 w-5"
                      value="male"
                      checked={selectedGenders === "male"}
                      onChange={() => handleCheckboxChange("male")}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-pink-500 h-5 w-5"
                      value="female"
                      checked={selectedGenders === "female"}
                      onChange={() => handleCheckboxChange("female")}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
                <div className=" flex gap-[110px]">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Address
                  </span>
                  <textarea
                    required
                    value={"address" in newData ? newData.address : address}
                    onChange={(e) =>
                      handleFileChange("address", e.target.value)
                    }
                    name=""
                    placeholder="Address"
                    className="mt-1 block w-1/2 p-4 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                    id=""
                    cols="10"
                    rows="4"
                  ></textarea>
                </div>
                <div className=" flex w-1/2 gap-6 mt-5 items-end justify-end">
                  <button
                    className=" text-white border border-stone-400 tracking-wider px-5 py-2 rounded-lg"
                    onClick={(e) => handleReset(e)}
                  >
                    Reset
                  </button>
                  <button
                    className=" px-6 py-2 rounded-lg button"
                    onClick={(_) => setSection("login")}
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          )}
          {section === "login" && (
            <form action="" onSubmit={handleUpdate}>
              <div className=" text-white flex flex-col gap-10 p-5">
                <div className=" flex gap-14 items-center">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Phone Number
                  </span>
                  <input
                    required
                    value={
                      "phone_number" in newData
                        ? newData.phone_number
                        : phone_number
                    }
                    onChange={(e) =>
                      handleFileChange("phone_number", e.target.value)
                    }
                    placeholder="Phone"
                    type="text"
                    className="mt-1 block w-1/2 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex gap-[133px] items-center">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Email
                  </span>
                  <input
                    required
                    value={"email" in newData ? newData.email : email}
                    onChange={(e) => handleFileChange("email", e.target.value)}
                    placeholder="Email"
                    type="text"
                    className="mt-1 block w-1/2 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex gap-6 w-1/2 justify-end">
                  <button
                    className=" text-white border border-stone-400 tracking-wider px-5 py-2 rounded-lg"
                    onClick={handleReset}
                  >
                    Reset
                  </button>

                  <button
                    className=" px-6 py-2 rounded-lg button"
                    type="submit"
                  >
                    Update Information
                  </button>
                </div>
              </div>
            </form>
          )}
          {section === "password" && (
            <form action="">
              <div className=" text-white flex flex-col gap-10 p-5">
                <div className=" flex gap-14 items-center">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Current Password
                  </span>
                  <input
                    required
                    value={
                      "current_password" in newData
                        ? newData.current_password
                        : ""
                    }
                    onChange={(e) =>
                      setNewData((prev) => ({
                        ...prev,
                        current_password: e.target.value,
                      }))
                    }
                    placeholder=".........."
                    type="text"
                    className="mt-1 block w-1/2 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>

                <>
                  <div className=" flex gap-20 items-center">
                    <span className=" text-[17px] text-stone-300 font-bold">
                      New Password
                    </span>
                    <input
                      required
                      value={
                        "new_password" in newData ? newData.new_password : ""
                      }
                      onChange={(e) =>
                        setNewData((prev) => ({
                          ...prev,
                          new_password: e.target.value,
                        }))
                      }
                      placeholder="........"
                      type="text"
                      className="mt-1 block w-1/2 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                    />
                  </div>
                  <div className=" flex gap-12 items-center">
                    <span className=" text-[17px] text-stone-300 font-bold">
                      Confirm Password
                    </span>
                    <input
                      required
                      value={
                        "confirm_password" in newData
                          ? newData.confirm_password
                          : ""
                      }
                      onChange={(e) =>
                        setNewData((prev) => ({
                          ...prev,
                          confirm_password: e.target.value,
                        }))
                      }
                      placeholder="........"
                      type="text"
                      className="mt-1 block w-1/2 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                    />
                  </div>{" "}
                </>

                <div className=" flex gap-6 w-1/2 justify-end">
                  <button
                    disabled={!canUpdatePassword}
                    className=" px-6 py-2 rounded-lg button"
                    onClick={handlePasswordUpdate}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </Rootlayout>
  );
};

export default EditProfile;

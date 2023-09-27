import React, { useRef, useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { Link } from "react-router-dom";
import { BsPersonBoundingBox } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { useCreateUserMutation, useGetPhotoQuery } from "../services/authApi";
import ModalPhoto from "../components/ModalPhoto";
import { HiOutlinePhoto } from "react-icons/hi2";
import { BaseUrl } from "../utils/constant";
import InfoTab from "../components/InfoTab";
import Swal from "sweetalert2";

const CreateUser = () => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const [section, setSection] = useState("personal");
  const [selectedGenders, setSelectedGenders] = useState("male");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [position, setPosition] = useState("staff");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [createUser, { isSuccess, isLoading }] = useCreateUserMutation();
  const token = localStorage.getItem("token");

  const handleCheckboxChange = (value) => {
    setSelectedGenders(value);
  };
  const redirectRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      const userData = {
        name,
        phone_number,
        date_of_birth,
        gender: selectedGenders,
        position,
        address,
        email,
        password,
        password_confirmation,
        photo: selectedPhoto.path,
      };

      const data = await createUser({ userData, token });

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "A new user has been registered!",
        showConfirmButton: true,

        confirmButtonText: "Go to User",
        preConfirm: () => {
          redirectRef?.current.click();
        },
        allowOutsideClick: false,
      });
    }
  };

  return (
    <Rootlayout>
      <div className="flex justify-between mx-5 mt-5">
        <div className="">
          <h1 className="text-2xl text-[#B19777]">Users</h1>
          <p className="text-white">Users / Create</p>
        </div>
        <Link to={"/users"} ref={redirectRef}>
          <button className=" py-2 px-4 rounded-lg button">Users</button>
        </Link>
      </div>
      <div className="mt-5 flex gap-16 items-center">
        {section === "personal" && (
          <form
            onSubmit={() => setSection("login")}
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
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
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
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
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
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm text-slate-400 focus:outline-none focus:border-[#B19777] text-[17px] placeholder:text-[17px]"
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
                  className="mt-1 block w-2/3 p-4 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
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

        {section === "login" && (
          <div className="flex flex-col">
            <form
              onSubmit={() => setSection("photo")}
              action=""
              className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
            >
              <div className=" text-white flex flex-col gap-8 p-5">
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Position
                  </span>
                  <select
                    onChange={(e) => setPosition(e.target.value)}
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm text-slate-400 focus:outline-none focus:border-[#B19777] text-[17px] placeholder:text-[17px]"
                    name="position"
                    id=""
                  >
                    <option value="admin" selected={position === "admin"}>
                      Admin
                    </option>
                    <option value="staff" selected={position === "staff"}>
                      Staff
                    </option>
                  </select>
                </div>
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Email
                  </span>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="text"
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Password
                  </span>
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    type="password"
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Comfirm Password
                  </span>
                  <input
                    required
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    placeholder=""
                    type="password"
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
              </div>
              {password !== password_confirmation && (
                <span className="text-warning text-sm  ms-5 mb-3">
                  Password doesn't match
                </span>
              )}

              {password.length > 3 && password === password_confirmation && (
                <button
                  type="submit"
                  className=" self-end py-2 px-4 rounded-lg button w-24 m-5"
                >
                  Next
                </button>
              )}
            </form>
          </div>
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
              <div className="mb-6 relative w-[180px] h-[180px] rounded-full border-2 border-dashed border-[#B19777] bg-[#272727] flex justify-center items-center">
                {selectedPhoto ? (
                  <img
                    src={
                      !selectedPhoto.url
                        ? BaseUrl + selectedPhoto
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
          // <form className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col">
          //   <div className="p-5">
          //     <div className="flex gap-5 items-center pb-5 border-b">
          //       {selectedPhoto && (
          //         <img
          //           className="w-[150px] h-[150px] rounded-full"
          //           src={
          //             !selectedPhoto.url
          //               ? selectedPhoto
          //               : selectedPhoto.url || ""
          //           }
          //           alt=""
          //         />
          //       )}
          //       <div className="">
          //         <h1 className="text-3xl mb-3 text-white">{name}</h1>
          //         <p className=" text-white">Sale Price : {sale_price} ကျပ်</p>
          //         <p className=" text-white">
          //           Actual Price : {actual_price} ကျပ်
          //         </p>
          //       </div>
          //     </div>
          //     <div className="flex mt-5 gap-20">
          //       <div className="space-y-4 text-white">
          //         <p>Phone</p>
          //         <p>Mail</p>
          //         <p>Address</p>
          //         <p>Gender</p>
          //         <p>Date of birth</p>
          //       </div>
          //       <div className="space-y-4 text-white">
          //         <p>: {phone_number}</p>
          //         <p>: {email}</p>
          //         <p>: {address || "-"}</p>
          //         <p>: {number || "-"}</p>
          //       </div>
          //     </div>
          //   </div>
          //   <button
          //     type="submit"
          //     className="self-end py-2 px-4 rounded-lg button m-5"
          //   >
          //     Edit Product
          //   </button>
          // </form>
          <div className="w-[550px] bg-[#323232] rounded-lg ml-5 p-5">
            <div className="flex items-center gap-5 px-5 py-3">
              <img
                src={selectedPhoto.url || selectedPhoto}
                alt="admin"
                className=" h-[150px] w-[150px] rounded-full"
              />
              <div className=" text-[#B19777]">
                <h2 className="text-3xl mb-2">{name}</h2>
                <p className=" text-gray-300 text-sm">{position}</p>
              </div>
            </div>
            <InfoTab
              password={password}
              detail={{
                phone_number,
                date_of_birth,
                gender: selectedGenders,
                address,
                position,
                email,
              }}
            />
          </div>
        )}
        <div className="">
          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-14 bg-[#323232] flex justify-center items-center rounded-full border ${
                section === "personal"
                  ? "border-[#B19777] text-[#B19777]"
                  : "border-white text-white"
              }`}
            >
              1
            </div>
            <p
              className={` ${
                section === "personal" ? "text-[#B19777]" : "text-white"
              }`}
            >
              Personal
            </p>
          </div>
          <div className="bg-[#B19777] w-[1px] h-[80px] ml-[28px] my-2"></div>
          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-14 bg-[#323232] flex justify-center items-center rounded-full border ${
                section === "login"
                  ? "border-[#B19777] text-[#B19777]"
                  : "border-white text-white"
              }`}
            >
              2
            </div>
            <p
              className={` ${
                section === "login" ? "text-[#B19777]" : "text-white"
              }`}
            >
              Login Info
            </p>
          </div>
          <div className="bg-[#B19777] w-[1px] h-[80px] ml-[28px] my-2"></div>

          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-14 bg-[#323232] flex justify-center items-center rounded-full border ${
                section === "photo"
                  ? "border-[#B19777] text-[#B19777]"
                  : "border-white text-white"
              }`}
            >
              3
            </div>
            <p
              className={` ${
                section === "photo" ? "text-[#B19777]" : "text-white"
              }`}
            >
              Photo
            </p>
          </div>
          <div className="bg-[#B19777] w-[1px] h-[80px] ml-[28px] my-2"></div>

          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-14 bg-[#323232] flex justify-center items-center rounded-full border ${
                section === "photo"
                  ? "border-[#B19777] text-[#B19777]"
                  : "border-white text-white"
              }`}
            >
              4
            </div>
            <p
              className={` ${
                section === "photo" ? "text-[#B19777]" : "text-white"
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
            Create User
          </button>
        )}
      </div>
    </Rootlayout>
  );
};

export default CreateUser;

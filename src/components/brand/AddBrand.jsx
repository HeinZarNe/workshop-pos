import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  useGetBrandQuery,
  useStoreBrandMutation,
  useUpdateBrandMutation,
} from "../../services/authApi";
import { BsPersonBoundingBox } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { isValidPhoneNumber, isValidUrl } from "../../utils/check";
import { BaseUrl } from "../../utils/constant";

const AddBrand = ({
  selectedPhoto,
  setEditBrand,
  setDataFetch,
  setSelectedPhoto,
  setShowSideBar,
  setShowPhotoModal,
  editBrand,
  // dataFetch,
}) => {
  const token = localStorage.getItem("token");
  const [storeBrand, { isLoading: uploading }] = useStoreBrandMutation();
  const [updateBrand, { isLoading: updating }] = useUpdateBrandMutation();
  const { data } = useGetBrandQuery(
    editBrand
      ? { token, detail: true, id: editBrand.id }
      : { token, detail: false }
  );
  const [brandData, setBrandData] = useState({});
  const [valid, setValid] = useState(false);

  useEffect(() => {
    return () => {
      setSelectedPhoto(null);
      setEditBrand({ state: false });
    };
  }, []);

  const handleImageChange = () => {
    setBrandData((prevData) => ({ ...prevData, photo: selectedPhoto.path }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prevData) => ({ ...prevData, [name]: value })); //good point :)
  };
  useEffect(() => {
    if (editBrand && data) {
      setBrandData({
        ...data?.data,
        name: data?.data.brand_name,
        phone_number: data?.data.contact,
      });
      setSelectedPhoto(data?.data.photo);
    }
    return () => {
      setBrandData({});
      setSelectedPhoto(null);
    };
  }, [editBrand, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editBrand.state) {
      const editedData = await updateBrand({ brandInfo: brandData, token });
      const { brand } = editedData?.data;
    } else {
      const data = await storeBrand({ brandData, token });
    }
    setShowSideBar(false);
    setDataFetch((pre) => !pre);
  };
  const CanUserSubmit = () => {
    const { name, company, agent, photo, phone_number, information } =
      brandData;

    // Validation for name, company, agent, and information
    const isNameValid = name?.length >= 2;
    const isCompanyValid = company?.length >= 2;
    const isAgentValid = agent?.length >= 2;
    const isInformationValid = information?.length >= 2;
    const isPhotoValid = photo?.length >= 2;

    // Validation for photo (checking if it's a valid URL)

    // Validation for phone number (checking if it's a valid phone number)
    const isPhoneNumberValid = phone_number?.length >= 5;

    // Check if any validation condition is not met
    if (
      isNameValid &&
      isCompanyValid &&
      isAgentValid &&
      isInformationValid &&
      isPhotoValid &&
      isPhoneNumberValid
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  useEffect(() => {
    CanUserSubmit();
  }, [brandData]);

  return (
    <div>
      <motion.div
        initial={{ x: "350px" }}
        animate={{ x: 0 }}
        exit={{ x: "350px" }}
        className=" absolute right-0 z-40 h-[calc(100vh-57px)] overflow-y-auto w-[300px] bg-[#323232] shadow-2xl"
      >
        <form onSubmit={handleSubmit} action="">
          <div className="  px-10 py-6 flex flex-col gap-[10px]">
            <div className="">
              <h1 className=" text-white font-[600] text-[20px] mb-5">
                {editBrand?.state ? "Edit" : " Add New Brand"}
              </h1>
              <div className="">
                <span className=" text-[15px] text-stone-300 font-bold">
                  Brand Name
                </span>
                <input
                  required
                  id="name"
                  name="name"
                  value={brandData.name}
                  onChange={handleInputChange}
                  type="text"
                  className=" mb-5 mt-1 block w-full p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px]"
                />
              </div>
              <div className="">
                <span className=" text-[15px] text-stone-300 font-bold">
                  Company Name
                </span>
                <input
                  required
                  id="company"
                  name="company"
                  value={brandData.company}
                  onChange={handleInputChange}
                  type="text"
                  className=" mb-5 mt-1 block w-full p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px]"
                />
              </div>
              <div className="">
                <span className=" text-[15px] text-stone-300 font-bold">
                  Agent
                </span>
                <input
                  required
                  id="agent"
                  name="agent"
                  value={brandData.agent}
                  onChange={handleInputChange}
                  type="text"
                  className=" mb-5 mt-1 block w-full p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px]"
                />
              </div>
              <div className="">
                <span className=" text-[15px] text-stone-300 font-bold">
                  Phone
                </span>
                <input
                  required
                  id="phone_number"
                  name="phone_number"
                  value={brandData.phone_number}
                  onChange={handleInputChange}
                  className=" mb-5 mt-1 block w-full p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px]"
                />
              </div>
              <div className="">
                <span className=" text-[15px] text-stone-300 font-bold">
                  Description
                </span>
                <textarea
                  // required
                  id="information"
                  name="information"
                  onChange={handleInputChange}
                  value={brandData.information}
                  className="mt-1 block w-full p-2 py-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#BB86FC] text-[#BB86FC] text-[17px] placeholder:text-[17px]"
                  cols="10"
                  rows="4"
                ></textarea>
              </div>
              <div className="bg-[#323232] rounded-lg ml-5 ">
                <div className="flex flex-col items-center p-5">
                  <h4 className="text-lg text-white mb-6">Upload Photo</h4>
                  <div className="mb-6 relative w-[180px] h-[150px] rounded-lg border-2 border-dashed border-[#BB86FC] bg-[#272727] flex justify-center items-center">
                    {selectedPhoto ? (
                      <img
                        src={selectedPhoto.url || selectedPhoto}
                        alt=""
                        onLoad={handleImageChange}
                      />
                    ) : (
                      <BsPersonBoundingBox className="text-6xl" />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setShowPhotoModal(true);
                      }}
                      className="button w-8 h-8 rounded-full absolute flex justify-center items-center translate-x-14 translate-y-16"
                    >
                      <RiEdit2Fill />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex gap-4 flex-col">
              {/* {valid && ( */}
              <button type="submit" className=" px-6 py-2 rounded-lg button">
                {" "}
                SAVE
              </button>
              {/* )} */}
              <button
                type="reset"
                onClick={() => setShowSideBar(false)}
                className=" text-white border border-stone-400 tracking-wider px-5 py-2 rounded-lg"
              >
                {" "}
                CANCEL
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBrand;

import React, { useRef, useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePhoto } from "react-icons/hi2";
import { RiEdit2Fill } from "react-icons/ri";
import Xbox from "../assets/images/XboxSeriesXController_HERO.jpg";
import Swal from "sweetalert2";
import {
  useGetBrandQuery,
  useGetProductQuery,
  useStoreProductMutation,
  useUpdateProductMutation,
} from "../services/authApi";
import {
  AiFillInfoCircle,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { useEffect } from "react";
import ModalPhoto from "../components/ModalPhoto";
import { Loader, Select } from "@mantine/core";
import { BaseUrl } from "../utils/constant";

const AddProduct = ({ editState = false, setEditState }) => {
  const [section, setSection] = useState("info");

  const token = localStorage.getItem("token");
  const {
    data: product,
    isSuccess: detailSuccess,
    isLoading: detailLoading,
  } = useGetProductQuery({
    detailId: editState.id,
    token,
  });

  const { data: brands } = useGetBrandQuery({ token, page: 0 });

  //for Photo Gallery
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(
    editState ? product?.data.photo : null
  );

  const [storeProduct, { isError, isSuccess, isLoading }] =
    useStoreProductMutation();
  const [
    updateProduct,
    {
      isError: productUpdateError,
      isSuccess: productUpdateSuccess,
      isLoading: productUpdateLoading,
    },
  ] = useUpdateProductMutation();
  const [name, setName] = useState(editState ? product?.data.name : "");
  const [brand_name, setBrand_name] = useState(
    editState ? product?.data.brand_name : ""
  );
  const [actual_price, setActurl_price] = useState(
    editState ? product?.data.actual_price : ""
  );
  const [sale_price, setSale_price] = useState(
    editState ? product?.data.sale_price : ""
  );
  const [total_stock, setTotalStock] = useState("");
  const [unit, setUnit] = useState(editState ? product?.data.unit : "");
  const [more_information, setMoreInformation] = useState(
    editState ? product?.data.more_information : ""
  );
  useEffect(() => {
    if (editState) {
      brands?.data.map(
        (brand) =>
          brand.brand_name == product?.data.brand_name &&
          setBrand_name(brand?.id)
      );
      setName(product?.data.name);

      setActurl_price(product?.data.actual_price);
      setSale_price(product?.data.sale_price);
      setUnit(product?.data.unit);
      setMoreInformation(product?.data.more_information);
      setSelectedPhoto(product?.data.photo);
    }
  }, [editState, product, brands]);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (editState) {
      const res = updateProduct({
        productData: {
          id: product?.data.id,
          name,
          brand_id: brand_name,
          actual_price,
          sale_price,
          more_information,
          photo: selectedPhoto.path || selectedPhoto,
          unit,
        },
        token,
      });

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Product has been updated!",
        showConfirmButton: true,

        confirmButtonText: "Go to Products",
        preConfirm: () => {
          setEditState(false);
        },
        allowOutsideClick: false,
      });
      return;
    }
    const res = await storeProduct({
      productData: {
        name,
        brand_id: brand_name,
        total_stock,
        actual_price,
        sale_price,
        more_information,
        photo: selectedPhoto.path || selectedPhoto,
        unit,
      },
      token,
    });

    await Swal.fire({
      position: "center",
      icon: "success",
      title: "A new product has been added!",
      showConfirmButton: true,

      confirmButtonText: "Go to Products",
      preConfirm: () => {
        navigate("/products");
      },
      allowOutsideClick: false,
    });
  };
  const GoToThisStep = (current) => {
    if (current === 1) {
      section !== "info" && setSection("info");
    } else if (current === 2) {
      section !== "info" && section !== "price" && setSection("price");
    } else if (current === 3) {
      section !== "info" &&
        section !== "price" &&
        section !== "photo" &&
        setSection("photo");
    }
  };
  return detailLoading ? (
    <div className="w-full flex items-center justify-center h-[300px]">
      <Loader />
    </div>
  ) : editState && detailSuccess ? (
    <div className="edit-product">
      {showPhotoModal && (
        <ModalPhoto
          setShowPhotoModal={setShowPhotoModal}
          showPhotoModal={showPhotoModal}
          setSelectedPhoto={setSelectedPhoto}
          selectedPhoto={selectedPhoto}
        />
      )}
      <div className="flex justify-between mx-5 mt-5">
        <div className="">
          <h1 className="text-2xl text-[#B19777]">
            {editState ? "Edit" : "Add"} Product
          </h1>
          <p className="text-white">
            Inventory / {editState ? "Edit" : "Add"} Product
          </p>
        </div>

        <button
          className=" py-2 px-4 rounded-lg button"
          onClick={(_) => setEditState(false)}
        >
          {editState ? "Go Back" : "Product List"}
        </button>
      </div>
      <div className="mt-5 flex gap-16 items-center">
        {section === "info" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              name &&
                brand_name &&
                unit &&
                more_information &&
                setSection("price");
            }}
            action=""
            className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
          >
            <div className=" text-white flex flex-col gap-8 p-5">
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Name *
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  type="text"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Brand *
                </span>
                <select
                  onChange={(e) => {
                    setBrand_name(Number(e.target.value));
                  }}
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                >
                  {brands?.data.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id === brand_name && "selected"}
                    >
                      {item.brand_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Unit *
                </span>
                <input
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder=""
                  type="text"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm text-[#B19777] focus:outline-none focus:border-[#B19777] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  More Info *
                </span>
                <textarea
                  required
                  onChange={(e) => setMoreInformation(e.target.value)}
                  value={more_information}
                  name=""
                  placeholder="More ..."
                  className="mt-1 block w-2/3 p-2 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  id=""
                  cols="10"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              {/* Fix it */}
              {[name, brand_name].some((item) => item === false) ? (
                <p className="text-warning flex flex-row items-center gap-1 pl-5">
                  <AiOutlineInfoCircle color={"#fbbd23"} />
                  Please fill every required information!
                </p>
              ) : (
                <div></div>
              )}
              <button
                disabled={[name, brand_name, unit, more_information].some(
                  (item) => item == false
                )}
                type="submit"
                className=" self-end py-2 px-4 rounded-lg button w-24 m-5"
              >
                Next
              </button>{" "}
            </div>
          </form>
        )}

        {section === "price" && (
          <div className="flex flex-col">
            <form
              onSubmit={() => setSection("photo")}
              action=""
              className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
            >
              <div className=" text-white flex flex-col gap-8 p-5">
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Actual Price *
                  </span>
                  <input
                    type="number"
                    required
                    value={actual_price}
                    onChange={(e) => {
                      if (e.target.value.length === 0 || e.target.value > 0) {
                        setActurl_price(Number(e.target.value));
                      }
                    }}
                    placeholder=""
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Sale Price *
                  </span>
                  <input
                    type="number"
                    required
                    value={sale_price}
                    onChange={(e) => {
                      if (e.target.value.length === 0 || e.target.value > 0) {
                        setSale_price(Number(e.target.value));
                      }
                    }}
                    placeholder=""
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
              </div>

              <button
                disabled={[sale_price, actual_price].some(
                  (item) => item != "e" && item == false
                )}
                type="submit"
                className=" self-end py-2 px-4 rounded-lg button w-24 m-5"
              >
                Next
              </button>
            </form>
          </div>
        )}
        {section === "photo" && (
          <div className="w-[550px] bg-[#323232] rounded-lg ml-5 ">
            <div className="flex flex-col items-center p-5">
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
                <button
                  className="button w-8 h-8 rounded-full absolute flex justify-center items-center translate-x-14 translate-y-16"
                  onClick={(_) => setShowPhotoModal(true)}
                >
                  {selectedPhoto ? <RiEdit2Fill /> : <AiOutlinePlus />}
                </button>
              </div>
            </div>
            <div className="p-5 flex justify-between">
              {selectedPhoto ? (
                <button
                  className=" border border-stone-400 py-2 px-4 rounded-lg mt-5"
                  onClick={() => setSelectedPhoto(null)}
                >
                  Clear Photo
                </button>
              ) : (
                <p className=" text-warning flex flex-row items-center gap-1">
                  <AiOutlineInfoCircle color={"#fbbd23"} />
                  Product image is required
                </p>
              )}

              <button
                disabled={!selectedPhoto}
                onClick={() => {
                  selectedPhoto && setSection("productPreview");
                }}
                className=" py-2 px-4 rounded-lg button mt-5"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {section === "productPreview" && (
          <form
            onSubmit={submitHandler}
            className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
          >
            <div className="p-5">
              <div className="flex gap-5 items-center pb-5 border-b">
                {selectedPhoto && (
                  <img
                    className="w-[150px] h-[150px] rounded-full"
                    src={
                      !selectedPhoto.url
                        ? selectedPhoto
                        : selectedPhoto.url || ""
                    }
                    alt=""
                  />
                )}
                <div className="">
                  <h1 className="text-3xl mb-3 text-white">{name}</h1>
                  <p className=" text-white">Sale Price : {sale_price} ကျပ်</p>
                  <p className=" text-white">
                    Actual Price : {actual_price} ကျပ်
                  </p>
                </div>
              </div>
              <div className="flex mt-5 gap-20">
                <div className="space-y-4 text-white">
                  <p>Name</p>
                  <p>Brand</p>
                  <p>Unit</p>
                  <p>More Information</p>
                </div>
                <div className="space-y-4 text-white">
                  <p>: {name}</p>
                  <p>: {brand_name}</p>
                  <p>: {unit || "-"}</p>
                  <p>: {more_information || "-"}</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="self-end py-2 px-4 rounded-lg button m-5"
            >
              Edit Product
            </button>
          </form>
        )}
        <div className="">
          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(1)}
              className={`w-14 h-14 ${
                section === "info"
                  ? "bg-[#323232] border-[#b19777] text-[#b19777]"
                  : "bg-[#B19777] "
              } flex justify-center items-center rounded-full border  "`}
            >
              1
            </div>
            <p
              className={
                section === "info" &&
                ` text-[#B19777]
              `
              }
            >
              Information
            </p>
          </div>
          <div className="bg-[#B19777] w-[1px] h-[80px] ml-[28px] my-2"></div>
          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(2)}
              className={`w-14 h-14 ${
                section === "info"
                  ? "bg-[#323232] border-[#fff] text-[#b19777]"
                  : section === "price"
                  ? "bg-[#323232] border-[#b19777] text-[#b19777]"
                  : "bg-[#B19777]"
              } flex justify-center items-center rounded-full border text-[#ffffff] "`}
            >
              2
            </div>
            <p
              className={` ${
                section !== "info" ? "text-[#B19777]" : "text-white"
              }`}
            >
              Price
            </p>
          </div>
          <div className="bg-[#B19777] w-[1px] h-[80px] ml-[28px] my-2"></div>

          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(3)}
              className={`w-14 h-14 ${
                section === "info" || section === "price" || section === "photo"
                  ? "bg-[#323232]"
                  : "bg-[#B19777]"
              } flex justify-center items-center rounded-full border ${
                section === "photo"
                  ? "border-[#B19777] text-[#B19777]  "
                  : (section !== "info" && section !== "price") ||
                    section !== "photo"
                  ? "border-[#fff] text-[#ffffff]  "
                  : "border-white text-white"
              }`}
            >
              3
            </div>
            <p
              className={` ${
                section !== "info" && section !== "price"
                  ? "text-[#B19777]"
                  : "text-white"
              }`}
            >
              Photo
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Rootlayout>
      {showPhotoModal && (
        <ModalPhoto
          setShowPhotoModal={setShowPhotoModal}
          showPhotoModal={showPhotoModal}
          setSelectedPhoto={setSelectedPhoto}
          selectedPhoto={selectedPhoto}
        />
      )}
      <div className="flex justify-between mx-5 mt-5">
        <div className="">
          <h1 className="text-2xl text-[#B19777]">
            {editState ? "Edit" : "Add"} Product
          </h1>
          <p className="text-white">
            Inventory / {editState ? "Edit" : "Add"} Product
          </p>
        </div>
        <Link to={"/products"}>
          <button className=" py-2 px-4 rounded-lg button">
            {editState ? "Go Back" : "Product List"}
          </button>
        </Link>
      </div>
      <div className="mt-5 flex gap-16 items-center">
        {section === "info" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              name && brand_name && total_stock && unit && setSection("price");
            }}
            action=""
            className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
          >
            <div className=" text-white flex flex-col gap-8 p-5">
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Name *
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  type="text"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Brand *
                </span>
                <select
                  name="brand_name"
                  value={brand_name}
                  onChange={(e) => {
                    setBrand_name(Number(e.target.value));
                  }}
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                >
                  {brands?.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.brand_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Stock *
                </span>
                <input
                  required
                  value={total_stock}
                  onChange={(e) => {
                    if (
                      (e.target.value.length === 0 &&
                        !Number.isNaN(e.target.value)) ||
                      e.target.value > 0
                    ) {
                      setTotalStock(Number(e.target.value));
                    }
                  }}
                  placeholder=""
                  type="number"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm text-[#B19777] focus:outline-none focus:border-[#B19777] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Unit *
                </span>
                <input
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder=""
                  type="text"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm text-[#B19777] focus:outline-none focus:border-[#B19777] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  More Info *
                </span>
                <textarea
                  required
                  onChange={(e) => setMoreInformation(e.target.value)}
                  value={more_information}
                  name=""
                  placeholder="More ..."
                  className="mt-1 block w-2/3 p-2 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  id=""
                  cols="10"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              {[name, brand_name, total_stock, unit, more_information].some(
                (item) => item == false
              ) ? (
                <p className="text-warning flex flex-row items-center gap-1 pl-5">
                  <AiOutlineInfoCircle color={"#fbbd23"} />
                  Please fill every required information!
                </p>
              ) : (
                <div></div>
              )}
              <button
                disabled={[name, brand_name, total_stock, unit].some(
                  (item) => item === false
                )}
                type="submit"
                className=" self-end py-2 px-4 rounded-lg button w-24 m-5"
              >
                Next
              </button>{" "}
            </div>
          </form>
        )}

        {section === "price" && (
          <div className="flex flex-col">
            <form
              onSubmit={() => setSection("photo")}
              action=""
              className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
            >
              <div className=" text-white flex flex-col gap-8 p-5">
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Actual Price *
                  </span>
                  <input
                    required
                    value={actual_price}
                    onChange={(e) => {
                      if (e.target.value.length === 0 || e.target.value > 0) {
                        setActurl_price(Number(e.target.value));
                      }
                    }}
                    placeholder=""
                    type="number"
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-stone-300 font-bold">
                    Sale Price *
                  </span>
                  <input
                    required
                    value={sale_price}
                    onChange={(e) => {
                      if (e.target.value.length === 0 || e.target.value > 0) {
                        setSale_price(Number(e.target.value));
                      }
                    }}
                    placeholder=""
                    type="number"
                    className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                  />
                </div>
              </div>

              <button
                disabled={[sale_price, actual_price].some(
                  (item) => item != "e" && item == false
                )}
                type="submit"
                className=" self-end py-2 px-4 rounded-lg button w-24 m-5"
              >
                Next
              </button>
            </form>
          </div>
        )}
        {section === "photo" && (
          <div className="w-[550px] bg-[#323232] rounded-lg ml-5 ">
            <div className="flex flex-col items-center p-5">
              <h4 className="text-lg text-white mb-6">Upload Photo</h4>
              <div className="mb-6 relative w-[180px] h-[180px] rounded-full border-2 border-dashed border-[#B19777] bg-[#272727] flex justify-center items-center">
                {selectedPhoto ? (
                  <img
                    src={selectedPhoto.url}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                    className="rounded-full h-[177px] aspect-square "
                  />
                ) : (
                  <HiOutlinePhoto className="text-6xl" />
                )}
                <button
                  className="button w-8 h-8 rounded-full absolute flex justify-center items-center translate-x-14 translate-y-16"
                  onClick={(_) => setShowPhotoModal(true)}
                >
                  {selectedPhoto ? <RiEdit2Fill /> : <AiOutlinePlus />}
                </button>
              </div>
            </div>
            <div className="p-5 flex justify-between">
              {selectedPhoto ? (
                <button
                  className=" border border-stone-400 py-2 px-4 rounded-lg mt-5"
                  onClick={() => setSelectedPhoto(null)}
                >
                  Clear Photo
                </button>
              ) : (
                <p className=" text-warning flex flex-row items-center gap-1">
                  <AiOutlineInfoCircle color={"#fbbd23"} />
                  Product image is required
                </p>
              )}

              <button
                disabled={!selectedPhoto}
                onClick={() => {
                  selectedPhoto && setSection("productPreview");
                }}
                className=" py-2 px-4 rounded-lg button mt-5"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {section === "productPreview" && (
          <form
            onSubmit={submitHandler}
            className="w-[550px] bg-[#323232] rounded-lg ml-5 flex flex-col"
          >
            <div className="p-5">
              <div className="flex gap-5 items-center pb-5 border-b">
                {selectedPhoto && (
                  <img
                    className="w-[150px] h-[150px] rounded-full"
                    src={selectedPhoto.url || ""}
                    alt=""
                  />
                )}
                <div className="">
                  <h1 className="text-3xl mb-3 text-white">{name}</h1>
                  <p className=" text-white">Sale Price : {sale_price} ကျပ်</p>
                  <p className=" text-white">
                    Actual Price : {actual_price} ကျပ်
                  </p>
                </div>
              </div>
              <div className="flex mt-5 gap-20">
                <div className="space-y-4 text-white">
                  <p>Name</p>
                  <p>Brand</p>
                  <p>Stock</p>
                  <p>Unit</p>
                  <p>More Information</p>
                </div>
                <div className="space-y-4 text-white">
                  <p>: {name}</p>
                  <p>: {brand_name}</p>
                  <p>: {total_stock}</p>
                  <p>: {unit || "-"}</p>
                  <p>: {more_information || "-"}</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="self-end py-2 px-4 rounded-lg button m-5"
            >
              Add Product
            </button>
          </form>
        )}
        <div className="">
          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(1)}
              className={`w-14 h-14 ${
                section === "info"
                  ? "bg-[#323232] border-[#b19777] text-[#b19777]"
                  : "bg-[#B19777] "
              } flex justify-center items-center rounded-full border  "`}
            >
              1
            </div>
            <p
              className={
                section === "info" &&
                ` text-[#B19777]
              `
              }
            >
              Information
            </p>
          </div>
          <div className="bg-[#B19777] w-[1px] h-[80px] ml-[28px] my-2"></div>
          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(2)}
              className={`w-14 h-14 ${
                section === "info"
                  ? "bg-[#323232] border-[#fff] text-[#b19777]"
                  : section === "price"
                  ? "bg-[#323232] border-[#b19777] text-[#b19777]"
                  : "bg-[#B19777]"
              } flex justify-center items-center rounded-full border text-[#ffffff] "`}
            >
              2
            </div>
            <p
              className={` ${
                section !== "info" ? "text-[#B19777]" : "text-white"
              }`}
            >
              Price
            </p>
          </div>
          <div className="bg-[#B19777] w-[1px] h-[80px] ml-[28px] my-2"></div>

          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(3)}
              className={`w-14 h-14 ${
                section === "info" || section === "price" || section === "photo"
                  ? "bg-[#323232]"
                  : "bg-[#B19777]"
              } flex justify-center items-center rounded-full border ${
                section === "photo"
                  ? "border-[#B19777] text-[#B19777]  "
                  : (section !== "info" && section !== "price") ||
                    section !== "photo"
                  ? "border-[#fff] text-[#ffffff]  "
                  : "border-white text-white"
              }`}
            >
              3
            </div>
            <p
              className={` ${
                section !== "info" && section !== "price"
                  ? "text-[#B19777]"
                  : "text-white"
              }`}
            >
              Photo
            </p>
          </div>
        </div>
      </div>
    </Rootlayout>
  );
};

export default AddProduct;

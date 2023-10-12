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
    token,
    detailId: editState.id,
  });

  const { data: brands } = useGetBrandQuery({ token, page: 0 });

  //for Photo Gallery
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(
    editState ? product?.data.photo : null
  );

  // console.log(product?.data);

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
    editState ? product?.data.brand_name : "1"
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
      brands?.with_no_pagi.map(
        (brand) =>
          brand.brand_name == product?.data.name && setBrand_name(brand?.id)
      );
      setName(product?.data.name);

      setActurl_price(product?.data.actual_price);
      setSale_price(product?.data.sale_price);
      setUnit(product?.data.unit);
      setMoreInformation(product?.data.more_information);
      setSelectedPhoto(product?.data?.photo);
    }
  }, [editState, product, brands]);

  const navigate = useNavigate();
  console.log(section);
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
        title: "Product has been updated !",
        buttonsStyling: false,
        icon: "success",
        showConfirmButton: true,
        color: "#bb86fc",
        width: "30em",
        confirmButtonText: "Go to Products",
        background: "#1e1e1e",
        customClass: {
          title: "text-primary",
          // htmlContainer: 'bg-secondary',
          // action: '!mt-2',
          confirmButton:
            "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
        },

        // position: "center",
        // icon: "success",
        // title: "Product has been updated!",
        // color: "#bb86fc",
        // showConfirmButton: true,
        // background: "#1e1e1e",
        // confirmButtonText: "Go to Products",
        // confirmButtonColor: "#bb86fc",
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
    window.location.pathname == "/products/create" ? (
      <div className="w-full flex h-[100vh] items-center justify-center ">
        <Loader size="xl" variant="bars" color="#bb86fc" />
      </div>
    ) : (
      <div className="w-full flex h-[50vh] items-center justify-center ">
        <Loader size="xl" variant="bars" color="#bb86fc" />
      </div>
    )
  ) : editState && detailSuccess ? (
    <div className="edit-product !bg-back">
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
          <h1 className="text-2xl text-primary">
            {editState ? "Edit" : "Add"} Product
          </h1>
          <p className="text-tcolor">
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
            className="w-[500px] bg-secondary rounded-lg ml-5 flex flex-col"
          >
            <div className=" text-tcolor flex flex-col gap-8 p-5">
              <div className=" flex items-center justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  Name
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  type="text"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex items-center justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  Brand
                </span>
                <select
                  onChange={(e) => {
                    setBrand_name(Number(e.target.value));
                  }}
                  // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                >
                  {brands?.with_no_pagi?.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id === brand_name && "selected"}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" flex items-center justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  Unit
                </span>
                <input
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder=""
                  type="text"
                  // className="mt-1 rounded-sm block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm text-primary focus:outline-none focus:border-primary text-[17px] placeholder:text-[17px]"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex items-center justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  More Info
                </span>
                <textarea
                  required
                  onChange={(e) => setMoreInformation(e.target.value)}
                  value={more_information}
                  name=""
                  placeholder="More ..."
                  // className="mt-1 block w-2/3 p-2 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
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
              className="w-[500px] bg-secondary rounded-lg ml-5 flex flex-col"
            >
              <div className=" text-tcolor flex flex-col gap-8 p-5">
                <div className=" flex items-center justify-between">
                  <span className=" text-[17px] text-tscolor font-bold">
                    Actual Price
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
                    // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                    className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex items-center justify-between">
                  <span className=" text-[17px] text-tscolor font-bold">
                    Sale Price
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
                    // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                    className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
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
          <div className="w-[500px] bg-secondary rounded-lg ml-5 ">
            <div className="flex flex-col items-center p-5">
              <h4 className="text-lg text-tcolor mb-6">Upload Photo</h4>
              <div className="mb-6 relative w-[180px] h-[180px] rounded-full border-2 border-dashed border-primary bg-[#272727] flex justify-center items-center">
                {selectedPhoto ? (
                  <img
                    src={selectedPhoto}
                    // src={
                    //   !selectedPhoto.url
                    //     ? BaseUrl + selectedPhoto
                    //     : selectedPhoto.url || ""
                    // }
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
            className="w-[500px] bg-secondary rounded-lg ml-5 flex flex-col"
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
                  <h1 className="text-3xl mb-3 text-tcolor">{name}</h1>
                  <p className=" text-tcolor">Sale Price : {sale_price} ကျပ်</p>
                  <p className=" text-tcolor">
                    Actual Price : {actual_price} ကျပ်
                  </p>
                </div>
              </div>
              <div className="flex mt-5 gap-20">
                <div className="space-y-4 text-tcolor">
                  <p className=" font-semibold">Name</p>
                  <p className=" font-semibold">Brand</p>
                  <p className=" font-semibold">Unit</p>
                  <p className=" font-semibold">More Information</p>
                </div>
                <div className="space-y-4 text-tcolor">
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
              Save
            </button>
          </form>
        )}
        <div className="">
          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(1)}
              className={`w-14 h-14 ${
                section === "info"
                  ? "bg-secondary text-lg border-primary text-primary"
                  : "bg-primary text-secondary border-0 text-lg"
              } flex justify-center items-center rounded-full border  "`}
            >
              1
            </div>
            <p
              className={
                section === "info" &&
                ` text-primary
              `
              }
            >
              Information
            </p>
          </div>
          <div className="bg-primary w-[1px] h-[80px] ml-[28px] my-2"></div>
          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(2)}
              className={`w-14 h-14 ${
                section === "info"
                  ? "bg-secondary text-lg border-primary text-primary"
                  : // ? "bg-secondary border-[#fff] text-primary"
                  section === "price"
                  ? "bg-secondary border-primary text-primary"
                  : "bg-primary text-secondary border-0 text-lg"
                // : "bg-primary"
              } flex justify-center items-center rounded-full border text-[#ffffff] "`}
            >
              2
            </div>
            <p
              className={` ${
                section !== "info" ? "text-primary" : "text-tcolor"
              }`}
            >
              Price
            </p>
          </div>
          <div className="bg-primary w-[1px] h-[80px] ml-[28px] my-2"></div>

          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(3)}
              className={`w-14 h-14 ${
                section === "info" || section === "price" || section === "photo"
                  ? "bg-secondary text-lg border-primary text-primary"
                  : "bg-primary text-secondary border-0 text-lg"
              } flex justify-center items-center rounded-full border ${
                section === "photo"
                  ? "border-primary text-primary  "
                  : (section !== "info" && section !== "price") ||
                    section !== "photo"
                  ? "border-[#fff] text-[#ffffff]  "
                  : "border-white text-tcolor"
              }`}
            >
              3
            </div>
            <p
              className={` ${
                section !== "info" && section !== "price"
                  ? "text-primary"
                  : "text-tcolor"
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
          <h1 className="text-2xl text-primary">
            {editState ? "Edit" : "Add"} Product
          </h1>
          <p className="text-tcolor">
            Inventory / {editState ? "Edit" : "Add"} Product
          </p>
        </div>
        <Link to={"/products"}>
          <button className=" py-2 px-4 rounded-lg button">
            {editState ? "Go Back" : "Product List"}
          </button>
        </Link>
      </div>

      {/* create  */}

      <div className="mt-5 flex gap-16 items-center">
        {section === "info" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // name && brand_name && total_stock && unit && setSection("price");
              name &&
                brand_name &&
                unit &&
                more_information &&
                setSection("price");
            }}
            action=""
            className="w-[550px] bg-secondary rounded-lg ml-5 flex flex-col"
          >
            <div className=" text-tcolor flex flex-col gap-8 p-5">
              <div className="items-center flex justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  Name
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  type="text"
                  // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className="items-center flex justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  Brand
                </span>
                <select
                  name="brand_name"
                  value={brand_name}
                  onChange={(e) => {
                    setBrand_name(Number(e.target.value));
                  }}
                  // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                >
                  {brands?.with_no_pagi.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className=" flex justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
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
                  className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm text-primary focus:outline-none focus:border-primary text-[17px] placeholder:text-[17px]"
                />
              </div> */}
              <div className="items-center flex justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  Unit
                </span>
                <input
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder=""
                  type="text"
                  // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm text-primary focus:outline-none focus:border-primary text-[17px] placeholder:text-[17px]"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className="items-center flex justify-between">
                <span className=" text-[17px] text-tscolor font-bold">
                  More Info
                </span>
                <textarea
                  required
                  onChange={(e) => setMoreInformation(e.target.value)}
                  value={more_information}
                  name=""
                  placeholder="More ..."
                  // className="mt-1 block w-2/3 p-2 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                  className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
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
                <p className="text-primary flex flex-row items-center gap-1 pl-5">
                  <AiOutlineInfoCircle color={"#BB86fc"} />
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

        {section == "price" && (
          <div className="flex flex-col">
            <form
              onSubmit={() => setSection("photo")}
              action=""
              className="w-[500px] bg-secondary rounded-lg ml-5 flex flex-col"
            >
              <div className=" text-tcolor flex flex-col gap-8 p-5">
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-tscolor font-bold">
                    Actual Price
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
                    // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                    className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                  />
                </div>
                <div className=" flex justify-between">
                  <span className=" text-[17px] text-tscolor font-bold">
                    Sale Price
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
                    // className="mt-1 block w-2/3 p-1 bg-gray/50 border border-white/50 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
                    className="mt-1 block w-2/3 p-3 rounded-md bg-gray/50 border-secondary border text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary text-primary text-[17px] placeholder:text-[17px]"
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
          <div className="w-[550px] bg-secondary rounded-lg ml-5 ">
            <div className="flex flex-col items-center p-5">
              <h4 className="text-lg text-tcolor mb-6">Upload Photo</h4>
              <div className="mb-6 relative w-[180px] h-[180px] rounded-full border-2 border-dashed border-primary bg-[#272727] flex justify-center items-center">
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
            className="w-[550px] bg-secondary rounded-lg ml-5 flex flex-col"
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
                  <h1 className="text-3xl mb-3 text-tcolor">{name}</h1>
                  <p className=" text-tcolor">Sale Price : {sale_price} ကျပ်</p>
                  <p className=" text-tcolor">
                    Actual Price : {actual_price} ကျပ်
                  </p>
                </div>
              </div>
              <div className="flex mt-5 gap-20">
                <div className="space-y-4 text-tcolor">
                  <p>Name</p>
                  <p>Brand</p>
                  <p>Stock</p>
                  <p>Unit</p>
                  <p>More Information</p>
                </div>
                <div className="space-y-4 text-tcolor">
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
                  ? "bg-secondary border-primary text-primary"
                  : "bg-primary "
              } flex justify-center items-center rounded-full border  "`}
            >
              1
            </div>
            <p
              className={
                section === "info" &&
                ` text-primary
              `
              }
            >
              Information
            </p>
          </div>
          <div className="bg-primary w-[1px] h-[80px] ml-[28px] my-2"></div>
          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(2)}
              className={`w-14 h-14 ${
                section === "info"
                  ? "bg-secondary border-[#fff] text-primary"
                  : section === "price"
                  ? "bg-secondary border-primary text-primary"
                  : "bg-primary"
              } flex justify-center items-center rounded-full border text-[#ffffff] "`}
            >
              2
            </div>
            <p
              className={` ${
                section !== "info" ? "text-primary" : "text-tcolor"
              }`}
            >
              Price
            </p>
          </div>
          <div className="bg-primary w-[1px] h-[80px] ml-[28px] my-2"></div>

          <div className="flex items-center gap-5">
            <div
              onClick={(_) => GoToThisStep(3)}
              className={`w-14 h-14 ${
                section === "info" || section === "price" || section === "photo"
                  ? "bg-secondary"
                  : "bg-primary"
              } flex justify-center items-center rounded-full border ${
                section === "photo"
                  ? "border-primary text-primary  "
                  : (section !== "info" && section !== "price") ||
                    section !== "photo"
                  ? "border-[#fff] text-[#ffffff]  "
                  : "border-white text-tcolor"
              }`}
            >
              3
            </div>
            <p
              className={` ${
                section !== "info" && section !== "price"
                  ? "text-primary"
                  : "text-tcolor"
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

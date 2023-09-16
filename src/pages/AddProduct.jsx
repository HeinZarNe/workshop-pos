import React, { useRef, useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePhoto } from "react-icons/hi2";
import { RiEdit2Fill } from "react-icons/ri";
import Xbox from "../assets/images/XboxSeriesXController_HERO.jpg";
import Swal from "sweetalert2";
import { useStoreProductMutation } from "../services/authApi";
import {
  AiFillInfoCircle,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";

const AddProduct = () => {
  const [section, setSection] = useState("info");
  const [storeProduct] = useStoreProductMutation();
  const [name, setName] = useState("");
  const [brand_name, setBrand_name] = useState("");
  const [actual_price, setActurl_price] = useState("");
  const [sale_price, setSale_price] = useState("");
  const [total_stock, setTotalStock] = useState("");
  const [unit, setUnit] = useState("");
  const [more_information, setMoreInformation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const imageUploadRef = useRef(null);
  const handleClearImage = () => {
    setPhoto(null);
    setImagePreview(null);
  };
  return (
    <Rootlayout>
      <div className="flex justify-between mx-5 mt-5">
        <div className="">
          <h1 className="text-2xl text-[#B19777]">Products</h1>
          <p className="text-white">Products / Create</p>
        </div>
        <Link to={"/products"}>
          <button className=" py-2 px-4 rounded-lg button">Products</button>
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
                <input
                  required
                  value={brand_name}
                  onChange={(e) => setBrand_name(e.target.value)}
                  placeholder=""
                  type="text"
                  className="mt-1 block w-2/3 p-1 bg-[#34353A] border border-slate-500 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#B19777] text-[#B19777] text-[17px] placeholder:text-[17px]"
                />
              </div>
              <div className=" flex justify-between">
                <span className=" text-[17px] text-stone-300 font-bold">
                  Stock *
                </span>
                <input
                  required
                  value={total_stock}
                  onChange={(e) =>
                    typeof Number(e.target.value) === "number" &&
                    Number(e.target.value) >= 0 &&
                    setTotalStock(e.target.value)
                  }
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
                  More Info
                </span>
                <textarea
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
              {[name, brand_name, total_stock, unit].some(
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
                    required
                    value={actual_price}
                    onChange={(e) => setActurl_price(e.target.value)}
                    placeholder=""
                    type="text"
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
                    onChange={(e) => setSale_price(e.target.value)}
                    placeholder=""
                    type="text"
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
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                    className="rounded-full h-[177px] aspect-square "
                  />
                ) : (
                  <HiOutlinePhoto className="text-6xl" />
                )}
                <button
                  className="button w-8 h-8 rounded-full absolute flex justify-center items-center translate-x-14 translate-y-16"
                  onClick={(_) => imageUploadRef.current.click()}
                >
                  {photo ? <RiEdit2Fill /> : <AiOutlinePlus />}
                </button>

                <input
                  ref={imageUploadRef}
                  className="hidden"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*" // Allow only image files
                />
              </div>
            </div>
            <div className="p-5 flex justify-between">
              {imagePreview ? (
                <button
                  className=" border border-stone-400 py-2 px-4 rounded-lg mt-5"
                  onClick={handleClearImage}
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
                disabled={!imagePreview}
                onClick={() => {
                  imagePreview && setSection("productPreview");
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
                {imagePreview && (
                  <img
                    className="w-[150px] h-[150px] rounded-full"
                    src={imagePreview || ""}
                    alt=""
                  />
                )}
                <div className="">
                  <h1 className="text-3xl mb-3 text-white">Xbox Series X</h1>
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

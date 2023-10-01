import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import {
  useCheckOutMutation,
  useGetProductToSaleQuery,
  useSaleCloseMutation,
} from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";

const Cashier = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [keyword, setKeyword] = useState(null);

  const { data, refetch, isLoading } = useGetProductToSaleQuery({
    token,
    keyword,
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [currentSelectedProductId, setCurrentSelectedProductId] =
    useState(null);
  const [keyBoardShow, setKeyBoardShow] = useState(false);
  const [checkOut] = useCheckOutMutation();

  // console.log(data);
  const handleProductClick = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        const updatedQuantities = { ...selectedQuantities };
        updatedQuantities[productId] =
          parseInt(updatedQuantities[productId] || 0) + 1;
        setSelectedQuantities(updatedQuantities);
        return prevSelected;
      } else {
        const updatedSelected = [...prevSelected, productId];
        const updatedQuantities = { ...selectedQuantities };
        updatedQuantities[productId] = 1;
        setSelectedQuantities(updatedQuantities);
        return updatedSelected;
      }
    });
  };

  const handleNumberClick = (number) => {
    if (currentSelectedProductId !== null) {
      setSelectedQuantities((prevQuantities) => {
        const currentQuantity = 0;
        if (prevQuantities[currentSelectedProductId] == 1) {
          if (number === "minus") {
            handleClearClick();
            return prevQuantities;
          } else if (number === "plus") {
            const updatedQuantities = {
              ...prevQuantities,
              [currentSelectedProductId]: 2,
            };
            return updatedQuantities;
          }

          const newQuantity = eval(`${currentQuantity} + ${number}`);
          const updatedQuantities = {
            ...prevQuantities,
            [currentSelectedProductId]: newQuantity,
          };
          return updatedQuantities;
        } else {
          const currentQuantity = prevQuantities[currentSelectedProductId] || 0;
          if (number === "plus") {
            const updatedQuantities = {
              ...prevQuantities,
              [currentSelectedProductId]: eval(`${currentQuantity} + 1`),
            };
            return updatedQuantities;
          } else if (number === "minus") {
            const updatedQuantities = {
              ...prevQuantities,
              [currentSelectedProductId]: eval(`${currentQuantity} - 1`),
            };
            return updatedQuantities;
          } else {
            const newQuantity = `${currentQuantity}${number}`;
            const updatedQuantities = {
              ...prevQuantities,
              [currentSelectedProductId]: newQuantity,
            };
            return updatedQuantities;
          }
        }
      });
    }
  };
  useEffect(() => {
    refetch();
  }, [data]);
  const [saleClose] = useSaleCloseMutation();
  const handleClearClick = () => {
    setSelectedQuantities((prevQuantities) => {
      const productId = currentSelectedProductId;
      const currentQuantity = prevQuantities[productId] || 0;
      const newQuantity = Math.floor(currentQuantity / 10);
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: newQuantity >= 1 ? newQuantity : 0,
      };

      if (newQuantity <= 0) {
        setSelectedProducts((prevSelected) =>
          prevSelected.filter((id) => id !== productId)
        );
      }

      return updatedQuantities;
    });
  };

  const calculateTotal = () => {
    let total = 0;

    selectedProducts.forEach((productId) => {
      const selectedProduct = data?.data?.find(
        (product) => product.id === productId
      );

      if (selectedProduct) {
        const quantity = selectedQuantities[productId] || 0;
        total += selectedProduct.price * quantity;
      }
    });

    return total;
  };

  const handleProductInCartSelect = (productId) => {
    setKeyBoardShow(true);
    setCurrentSelectedProductId(productId);
    setSelectedProducts((prevSelected) => {
      if (!prevSelected.includes(productId)) {
        return [...prevSelected, productId];
      }
      return prevSelected;
    });
  };

  const handlePaymentClick = () => {
    if (selectedProducts?.length === 0) return;
    const total = calculateTotal();

    const checkoutData = {
      selectedProducts,
      selectedQuantities,
      total,
      data,
    };

    const dataToSend = {
      items: selectedProducts.map((item) => ({
        product_id: item,
        quantity: selectedQuantities[item],
      })),
    };
    checkOut({ data: dataToSend, token }).then((res) => {
      res?.data &&
        navigate("/checkout", {
          state: { checkoutData, dataToSend, res: res.data },
        });
    });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSaleOpen = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "blue",
      timer: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = saleClose(token);

        Swal.fire("Opened!", "", "success");
        refetch();
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  if (data?.is_sale_close) {
    return (
      <div className="bg-[#272727] h-screen">
        <div className="flex justify-between gap-5 ">
          <div className="w-full">
            <div className="flex justify-between mx-5 my-5">
              <div className=" flex items-center">
                <p
                  className="ms-2 cursor-pointer flex gap-2 btn btn-outline items-center text-lg py-2 hover:bg-base hover:border-base text-base hover:text-white  font-semibold"
                  onClick={handleGoBack}
                >
                  <FaArrowLeft /> Back
                </p>
              </div>
            </div>
            <div className="h-[70vh] flex flex-col items-center justify-center">
              <div className="border border-base px-10 py-5 w-fit gap-3   rounded-lg flex flex-col justify-center items-center">
                <p className="text-2xl font-semibold">
                  Sale is currently closed. Do you want to open it?
                </p>
                <button
                  className="px-3 py-1 pb-2 font-semibold rounded-md text-xl border border-base"
                  onClick={handleSaleOpen}
                >
                  Open
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#272727]">
      <div className="flex justify-between gap-5 ">
        <div className="w-full">
          <div className="flex justify-between mx-5 my-5">
            <div className=" flex items-center">
              <p
                className="ms-2 cursor-pointer flex gap-2 btn btn-outline items-center text-lg py-2 hover:bg-base hover:border-base text-base hover:text-white  font-semibold"
                onClick={handleGoBack}
              >
                <FaArrowLeft /> Back
              </p>
            </div>
            <div class="relative my-3 flex items-center">
              <div class="absolute inset-y-0 left-2 flex items-center text-[#B19777] pointer-events-none">
                <svg
                  className="w-4 h-4 ms-1 text-[#B19777] dark:text-[#B19777]"
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
                class="block py-2 pl-10 pr-3 w-[300px] me-2 text-sm text-[#B19777] border border-[#B19777] rounded-lg bg-[#272727]   placeholder-[#B19777]  focus:outline-none"
                placeholder="Search ..."
              />
            </div>
          </div>
          <div className="w-[100%] mx-auto ">
            <div className="flex flex-row h-screen overflow-scroll flex-wrap gap-3 justify-center items-center">
              {/* {test.map((product) => ( */}
              {data?.products?.map((product) => (
                <div
                  key={product.id}
                  className={`product flex hover:bg-base/20 flex-col justify-between cursor-pointer  w-[23%] bg-[#323232] border border-[#B19777] rounded-lg shadow dark:bg-[#323232] dark:border-[#B19777]" ${
                    selectedProducts.includes(product.id) ? "active" : ""
                  }`}
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="w-full object-fill">
                    <img
                      src={product.photo}
                      className="object-cover object-center h-[190px] rounded-t-lg fit w-full"
                      alt=""
                    />
                  </div>

                  <div className="p-5 pt-3 pe-6 text-right">
                    <h5 className=" text-xl font-semibold tracking-tight text-[#B19777]">
                      {product.name}
                    </h5>
                    <p className=" font-normal  text-gray-400">
                      {product.price} Kyats
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* keyboard  */}
        <div className="flex relative  overflow-hidden flex-col h-screen w-[440px] ms-auto border-l border-l-[#B19777] max-h-screen">
          <div className="">
            <h1 className="text-3xl py-5 px-4 text-white font-semibold border-b border-b-[#B19777]">
              RECEIVE
            </h1>
          </div>
          <div
            className={
              keyBoardShow
                ? "overflow-auto w-full h-[205px]"
                : "overflow-auto w-full h-full"
            }
          >
            {selectedProducts.map((productId) => {
              const selectedProduct = data?.data?.find(
                (product) => product.id === productId
              );

              if (!selectedProduct) {
                return null;
              }
              const quantity = selectedQuantities[productId] || 0;
              const totalPrice = selectedProduct.price * quantity;

              return (
                // <div
                //   key={productId}
                //   className={`display cursor-pointer flex py-1 px-4 justify-between items-   transition-all border-b border-b-[#B19777]
                //   ${
                //     selectedProduct.id === currentSelectedProductId &&
                //     keyBoardShow
                //       ? " bg-base/20"
                //       : ""
                //   }
                //   `}
                //   onClick={() => handleProductInCartSelect(productId)}
                // >
                //   <div className=" ">
                //     <h5 className=" text-lg font-semibold tracking-tight text-base">
                //       {selectedProduct.name}
                //     </h5>
                //     <div className="flex ms-1 font-mono text-sm">
                //       <p className=" text-sm flex gap-1 text-gray-400">
                //         <div className="text-white/80">
                //           {" "}
                //           {selectedProduct.price}
                //         </div>
                //         Kyats
                //       </p>
                //       <div className="mx-2">x</div>
                //       <p className="mb-3 text-gray-400">{quantity}</p>
                //     </div>
                //   </div>
                //   <p className="flex gap-1 text-[#fafafa] font-semibold">
                //     {totalPrice}{" "}
                //     <div className="font-normal text-white/70">Kyats</div>
                //   </p>
                // </div>
                <div
                  key={productId}
                  className={`display cursor-pointer flex py-1 px-4 justify-between items-   transition-all border-b border-b-[#B19777] 
                  ${
                    selectedProduct.id === currentSelectedProductId &&
                    keyBoardShow
                      ? " bg-base/20"
                      : ""
                  }
                  `}
                  onClick={() => handleProductInCartSelect(productId)}
                >
                  <div className=" ">
                    <h5 className=" text-lg font-semibold tracking-tight text-base">
                      {selectedProduct.name}
                    </h5>
                    <div className="flex ms-1 font-mono text-sm">
                      <p className=" text-sm flex gap-1 text-gray-400">
                        <div className="text-white/80">
                          {" "}
                          {selectedProduct.price}
                        </div>
                        Kyats
                      </p>
                      <div className="mx-2">x</div>
                      <p className="mb-3 text-gray-400">{quantity}</p>
                    </div>
                  </div>
                  <p className="flex gap-1 text-[#fafafa] font-semibold">
                    {totalPrice}{" "}
                    <div className="font-normal text-white/70">Kyats</div>
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className={`flex mt-auto absolute bg-secondary w-full bottom-0 duration-200 ${
              keyBoardShow ? "translate-x-0" : "translate-y-[260px]"
            } flex-col`}
          >
            <div className="">
              <div className="text-end py-1 pb-2">
                <div className="flex text-xl text-white  justify-end me-4">
                  Cash:
                  <p className="ms-2 font-semibold text-[#fafafa]">
                    {calculateTotal()}
                  </p>
                </div>
                <div className="flex text-sm justify-end me-4">
                  Tax: <p className="ms-1">300Kyats</p>
                </div>
              </div>
              <div
                onClick={() => setKeyBoardShow(false)}
                className="flex border-t border-gray-400 items-center"
              >
                {keyBoardShow && (
                  <div className="border border-gray-400 ms-2 hover:bg-gray-400 duration-100 hover:text-black p-2 rounded px-3 flex">
                    <FaChevronDown />
                  </div>
                )}
                <p className=" text-xl text-white flex ms-auto py-4 pt-3 justify-end me-4 h-[80px]">
                  Total:
                  <div className="ms-2 text-[#fafafa] font-semibold">
                    {" "}
                    {calculateTotal() + 300 + " "}
                  </div>{" "}
                </p>
              </div>
            </div>
            {/* keyboard layout  */}
            <div className="mb-12 w-full bg-[#323232]">
              {/* <div className="absolute bottom-0 w-full bg-[#323232]"> */}
              <div className="buttons  text-gray-400">
                <div className="grid grid-cols-2 h-12">
                  <button
                    onClick={() => handleNumberClick("minus")}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-2xl number-btn"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleNumberClick("plus")}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-2xl number-btn"
                  >
                    +
                  </button>
                  {/* <button
                    onClick={() => handleNumberClick("")}
                    className={`${
                      keyBoardShow
                        ? "bg-base/90 text-white col-span-1 font-semibold number-btn"
                        : "col-span-1 font-semibold number-btn"
                    } `}
                  >
                    QTY
                  </button> */}
                  {/* <button
                  // onClick={() => handleNumberClick("9")}
                  className="col-span-1 number-btn"
                >
                  Qty
                </button> */}
                </div>{" "}
                <div className="grid grid-cols-3 h-12">
                  <button
                    onClick={() => handleNumberClick(7)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    7
                  </button>
                  <button
                    onClick={() => handleNumberClick(8)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    8
                  </button>
                  <button
                    onClick={() => handleNumberClick(9)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    9
                  </button>
                  {/* <button
                    onClick={() => handleNumberClick("")}
                    className={`${
                      keyBoardShow
                        ? "bg-base/90 text-white col-span-1 font-semibold number-btn"
                        : "col-span-1 font-semibold number-btn"
                    } `}
                  >
                    QTY
                  </button> */}
                  {/* <button
                  // onClick={() => handleNumberClick("9")}
                  className="col-span-1 number-btn"
                >
                  Qty
                </button> */}
                </div>
                <div className="grid grid-cols-3 h-12">
                  <button
                    onClick={() => handleNumberClick(4)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    4
                  </button>
                  <button
                    onClick={() => handleNumberClick(5)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    5
                  </button>
                  <button
                    onClick={() => handleNumberClick(6)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    6
                  </button>

                  {/* <button
                  // onClick={() => handleNumberClick("9")}
                  className="col-span-1 number-btn"
                >
                  %Disc
                </button> */}
                </div>
                <div className="grid grid-cols-3 h-12">
                  <button
                    onClick={() => handleNumberClick(1)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleNumberClick(2)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl number-btn"
                  >
                    2
                  </button>
                  <button
                    onClick={() => handleNumberClick(3)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] text-xl  number-btn"
                  >
                    3
                  </button>
                  {/* <button
                    onClick={() => handleNumberClick("")}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa] font-semibold number-btn"
                  >
                    PRICE
                  </button> */}
                  {/* <button
                  // onClick={() => handleNumberClick("9")}
                  className="col-span-1 number-btn"
                >
                  Price
                </button> */}
                </div>
                <div className="grid grid-cols-3 h-12">
                  {/* <button
                    // onClick={() => handleNumberClick("0")}
                    className="col-span-1 text-lg hover:bg-base/30 hover:text-[#fafafa] font-semibold number-btn"
                  >
                    +/-
                  </button> */}
                  <button
                    onClick={() => handleNumberClick(0)}
                    className="col-span-1 hover:bg-base/30 hover:text-[#fafafa]  text-xl number-btn"
                  >
                    0
                  </button>
                  {/* <button
                  // onClick={() => handleNumberClick(".")}
                  className="col-span-1 number-btn"
                >
                  .
                </button> */}
                  <button
                    onClick={handleClearClick}
                    className="flex justify-center hover:bg-base/30 hover:text-[#fafafa] text-xl font-bold items-center number-btn"
                  >
                    .
                  </button>
                  <button
                    onClick={handleClearClick}
                    className="flex font-semibold hover:bg-base/30 hover:text-[#fafafa] text-xl justify-center items-center number-btn"
                  >
                    <FiDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`grid absolute w-full bottom-0 grid-cols-1 ${
              selectedProducts?.length === 0 ? "bg-[#2e2e2e]" : "bg-[#B19777]"
            }  text-white`}
          >
            <button
              onClick={handlePaymentClick}
              disabled={selectedProducts?.length === 0}
              className=" number-btn h-[49px]"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashier;

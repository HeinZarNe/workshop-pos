import React from "react";
import Navbar from "../layout/Navbar";
import { BiArrowBack } from "react-icons/bi";
import "./Checkout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  //   const navigate = useNavigate();
  const { selectedProducts, selectedQuantities, data } =
    location.state.checkoutData;
  const { net_total, total, tax } = location.state.res;
  const handlePrint = () => {
    window.print();
  };

  const handleBackClick = () => {
    // Navigate back to the previous page
    window.history.back();
  };

  return (
    <div className="h-screen bg-[#272727]  box-border">
      <Navbar />
      <div className="px-5 py-3 border-b border-b-[#BB86FC] mb-5">
        <button className=" flex items-center" onClick={handleBackClick}>
          <BiArrowBack className="text-2xl mr-2" />
          <span className="text-xl">Back</span>
        </button>
      </div>
      <div className="flex justify-center">
        <div className="p-5 bg-[#323232] rounded-md w-[350px] max-h-screen receipt">
          <div>
            <h1 className=" text-3xl text-[#BB86FC] mb-3">LOTTIE</h1>
          </div>
          <div className="flex flex-col gap-5">
            <div className="p-8 border-y border-y-[#BB86FC]">
              <ul className="flex flex-col gap-3 border-b border-b-[#BB86FC]">
                {selectedProducts.map((productId) => {
                  const selectedProduct = data?.data?.find(
                    (product) => product.id === productId
                  );

                  if (!selectedProduct) {
                    return null;
                  }
                  const quantity = selectedQuantities[productId] || 0;

                  return (
                    <li key={productId} className="flex justify-between">
                      <div className="">
                        <p className=" text-[#BB86FC]">
                          {selectedProduct.name}
                        </p>
                        <p className=" text-gray-400">{quantity}</p>
                      </div>
                      <p className=" text-2xl text-gray-400">
                        $ {selectedProduct.price * quantity}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex justify-between h-[30px]">
                <p className=" text-2xl text-gray-400"></p>
                <p className=" text-2xl text-gray-400">$ {total}</p>
              </div>
              <div className="pb-3 flex justify-between  border-b border-b-[#BB86FC]">
                <p className=" text-2xl text-gray-400">Tax</p>
                <p className=" text-2xl text-gray-400">
                  $ {Number(tax).toFixed(2)}
                </p>
              </div>
              <div className=" flex justify-between ">
                <p className=" text-3xl text-gray-400">Total</p>
                <p className=" text-2xl text-gray-400">$ {net_total}</p>
              </div>
            </div>
            <div className=" text-gray-300 text-center">
              <p>Thanks for shopping with us!</p>
              <p>Have a nice day!</p>
            </div>
            <div className=" flex justify-center gap-3">
              <button
                className="bg-[#BB86FC] text-white rounded-lg w-fit px-5 py-2 print:hidden"
                onClick={handlePrint}
              >
                Print
              </button>
              <Link to="/sale/cashier">
                <button className="bg-[#BB86FC] text-white rounded-lg w-fit px-5 py-2 print:hidden">
                  Next
                </button>
              </Link>
              <Link to="/sale/recent">
                <button className="bg-[#BB86FC] text-white rounded-lg w-fit px-5 py-2 print:hidden">
                  Recent
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

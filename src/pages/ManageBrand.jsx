import React from "react";
import Rootlayout from "../layout/Rootlayout";
import BrandTable from "../components/brand/BrandTable";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import AddBrand from "../components/brand/AddBrand";
import { useState } from "react";
import ModalPhoto from "../components/ModalPhoto";
import { useEffect } from "react";

const ManageBrand = () => {
  const [showSidebar, setShowSideBar] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [dataFetch, setDataFetch] = useState(false);

  const [editBrand, setEditBrand] = useState({
    state: false,
    id: 0,
  });
  useEffect(() => {
    if (editBrand.state) setShowSideBar(true);

    return () => {
      setShowSideBar(false);
    };
  }, [editBrand]);

  return (
    <Rootlayout>
      {showSidebar && (
        <AddBrand
          editBrand={editBrand}
          setDataFetch={setDataFetch}
          setEditBrand={setEditBrand}
          showPhotoModal={showPhotoModal}
          setShowPhotoModal={setShowPhotoModal}
          showSidebar={showSidebar}
          setTableData={setTableData}
          setShowSideBar={setShowSideBar}
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        />
      )}
      {showPhotoModal ? (
        <ModalPhoto
          setShowPhotoModal={setShowPhotoModal}
          showPhotoModal={showPhotoModal}
          setSelectedPhoto={setSelectedPhoto}
          selectedPhoto={selectedPhoto}
        />
      ) : (
        ""
      )}

      <div className=" mx-10 my-5">
        <div className=" flex justify-between">
          <div className="">
            <h1 className=" text-[20px] font-[500] text-white">Products</h1>
            <p className=" text-gray-500">Inventory/ Brands</p>
          </div>
          <div className=" flex gap-3">
            <Link to={"/"}>
              <button className=" px-4 py-2 rounded-lg text-white border border-[#FFFFFF] hover:bg-[#B19777]">
                {" "}
                Go To Shop
              </button>
            </Link>
            <Link to={""}>
              <button
                onClick={() => setShowSideBar(true)}
                className=" px-4 py-2 rounded-lg flex items-center gap-2 button"
              >
                {" "}
                <AiOutlinePlus />
                Add Brand
              </button>
            </Link>
          </div>
        </div>
        {/* product overview */}
        <div className=" my-5">
          <h1 className="text-[21px] font-[500] text-white">Brands Overview</h1>
          {/* search */}
          <div className="flex justify-between">
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
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(0);
                }}
                type="search"
                id="default-search"
                className="block w-[300px] p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-[#272727]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search ..."
                required
              />
            </div>
          </div>
          <BrandTable
            keyword={keyword}
            dataFetch={dataFetch}
            setEditBrand={setEditBrand}
            editBrand={editBrand}
            tableData={tableData}
            setTableData={setTableData}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </Rootlayout>
  );
};

export default ManageBrand;

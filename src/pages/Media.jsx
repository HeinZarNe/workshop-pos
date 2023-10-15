import React, { useEffect, useRef, useState } from "react";
import Rootlayout from "../layout/Rootlayout";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { GoCopy } from "react-icons/go";
import { useGetPhotoQuery, useStorePhotoMutation } from "../services/authApi";
import "./Media.css";
import { useDeletePhotoMutation } from "../services/mediaApi";
import { addphoto, deletePhoto } from "../services/mediaSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Pagination } from "@mantine/core";
import { BaseUrl } from "../utils/constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Media = () => {
  const token = localStorage.getItem("token");
  const fileRef = useRef(null);
  const [storePhoto] = useStorePhotoMutation();
  const [deletePhotoMutation] = useDeletePhotoMutation();
  const dispatch = useDispatch();
  const { data: photo, refetch, isError, error } = useGetPhotoQuery(token);
  const navigate = useNavigate();
  // const { photo } = useSelector((state) => state.media);
  // console.log(photoList)

  const handleFileChange = async (e) => {
    const selectedFile = await e.target.files;
    let photos = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      photos.append("photos[]", selectedFile[i], selectedFile[i].name);
    }

    const data = await storePhoto({ photos, token });
    refetch();
  };

  const handleUpload = async () => {
    fileRef.current.click();
  };

  const handleDelete = async (photo) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      iconColor: "#bb86fc",
      buttonsStyling: false,
      width: "20em",
      color: "#fafafa",
      heightAuto: false,
      background: "#1E1E1E",
      focusConfirm: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      customClass: {
        cancelButton:
          "bg-primary text-secondary rounded-lg border-2 border-primary px-4 font-mono py-2",
        confirmButton:
          "bg-transparent text-primary rounded-lg border-2 border-primary px-7 font-mono py-2",
        // htmlContainer: '!pb-0',
        actions: " !mt-5 !w-[100%] flex justify-center gap-9",
        icon: "!p-0",
        title: "!mt-0 !pt-0",
      },
      // cancelButtonColor: "#bb86fc",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { id } = photo;
        const res = await deletePhotoMutation({ token, id });

        if (res.data.message == "A photo has been deleted") {
          dispatch(deletePhoto(id));
        }
        refetch();
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // if (isError) {
  //   Swal.fire({
  //     title: "Something is wrong! <br/> Please try to  Login again",
  //     icon: "error",
  //     buttonsStyling: false,
  //     color: "#bb86fc",
  //     width: "25em",
  //     background: "#1e1e1e",
  //     showConfirmButton: true,
  //     confirmButtonText: "Go to Login Page",
  //     customClass: {
  //       title: "text-primary",
  //       confirmButton:
  //         "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
  //     },
  //   }).then((result) => {
  //     navigate("/login");
  //   });
  // }

  return (
    <Rootlayout>
      <div className=" mx-10 my-5">
        <h1 className=" text-[20px] font-[500] text-white ">Media</h1>
        <p>Media / Uploader</p>
        {/* upload */}
        <div
          className=" bg-zinc-700 my-6 h-[200px]  flex justify-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className=" flex flex-col items-center justify-center gap-5">
            <button
              onClick={handleUpload}
              className=" p-4 text-white border-dashed border-2 border-white rounded-full"
            >
              <BsCloudUpload size={30} />
            </button>
            <p className=" text-white">Browsed Or Drag Photo</p>
            <input
              type="file"
              ref={fileRef}
              accept=" image/jpeg,image/png"
              style={{ display: "none" }}
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
        {/* gallary */}
        <div className=" mt-12">
          <h1 className=" text-[20px] font-[500] text-stone-400 mb-10">
            Uploaded Photo
          </h1>
          <div className="flex bg-red-300 flex-row gap-3 flex-wrap">
            {photo?.length > 0 ? (
              photo
                // ?.sort((a, b) => b.id - a.id)
                ?.map((photo, i) => (
                  <div
                    key={i}
                    className="img-container rounded-md overflow-hidden p-2 border border-secondary hover:border-primary relative"
                  >
                    <div className="action-btns absolute  flex-row gap-3 bottom-5 right-5">
                      <button
                        className="bg-primary hover:border hover:border-secondary w-[33px] h-[33px] flex items-center p-2 rounded-full shadow-md text-secondary"
                        onClick={(_) => handleDelete(photo)}
                      >
                        <AiOutlineDelete size={27} />
                      </button>
                      {/* <button className="bg-secondary hover:border hover:border-white w-[33px] h-[33px] flex items-center p-2 rounded-full shadow-md text-white">
                          <GoCopy />
                        </button> */}
                    </div>
                    <img
                      className="rounded-md object-cover object-center h-[200px] w-[200px]"
                      src={photo.url}
                      alt=""
                    />
                  </div>
                ))
            ) : (
              <div className="w-full flex h-[25vh] items-center justify-center ">
                <Loader size="xl" variant="bars" color="#bb86fc" />
              </div>
            )}
          </div>
          {/* <div className="pagination ">
            <Pagination
              total={data?.meta?.last_page}
              onChange={(e) => {
                setPage(e);
                refetch();
              }}
              boundaries={1}
              defaultValue={1}
              on
            />
          </div> */}
        </div>
      </div>
    </Rootlayout>
  );
};

export default Media;

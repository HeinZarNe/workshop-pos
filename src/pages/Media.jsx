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
import { Pagination } from "@mantine/core";

const Media = () => {
  const token = localStorage.getItem("token");
  const fileRef = useRef(null);
  const [storePhoto] = useStorePhotoMutation();
  const [page, setPage] = useState(1); // Current page
  const [deletePhotoMutation] = useDeletePhotoMutation();
  const dispatch = useDispatch();
  const { photo } = useSelector((state) => state.media);
  const photoList = [...photo];

  const handleFileChange = async (e) => {
    const selectedFile = await e.target.files;
    let photos = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      photos.append("photos[]", selectedFile[i], selectedFile[i].name);
    }

    const data = await storePhoto({ photos, token });
  };

  const handleUpload = async () => {
    fileRef.current.click();
  };

  const handleDelete = async (photo) => {
    const { id } = photo;
    const res = await deletePhotoMutation({ token, id });

    if (res.data.message == "A photo has been deleted") {
      dispatch(deletePhoto(id));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

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
              accept="image/png, image/jpg"
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
          <div className="flex flex-row gap-3 flex-wrap">
            {photoList?.length > 0
              ? photoList
                  .sort((a, b) => b.id - a.id)
                  .map((photo, i) => (
                    <div
                      key={i}
                      className="img-container p-2 border border-secondary hover:border-white relative"
                    >
                      <div className="action-btns absolute  flex-row gap-3 bottom-5 right-5">
                        <button
                          className="bg-secondary hover:border hover:border-white w-[33px] h-[33px] flex items-center p-2 rounded-full shadow-md text-white"
                          onClick={(_) => handleDelete(photo)}
                        >
                          <AiOutlineDelete size={27} />
                        </button>
                        {/* <button className="bg-secondary hover:border hover:border-white w-[33px] h-[33px] flex items-center p-2 rounded-full shadow-md text-white">
                          <GoCopy />
                        </button> */}
                      </div>
                      <img
                        className=" h-[200px] w-[200px]"
                        src={photo.url}
                        alt=""
                      />
                    </div>
                  ))
              : ""}
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

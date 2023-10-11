import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useGetPhotoQuery, useStorePhotoMutation } from "../services/authApi";
import { useDispatch } from "react-redux";
import { addphoto } from "../services/mediaSlice";
import { BiPlus } from "react-icons/bi";

const ModalPhoto = ({
  setShowPhotoModal,
  showPhotoModal,
  setSelectedPhoto,
  selectedPhoto,
}) => {
  const token = localStorage.getItem("token");
  const { data } = useGetPhotoQuery(token);
  const [storePhotoMutation] = useStorePhotoMutation();
  const [clickedPhoto, setClickedPhoto] = useState(null);
  const dispatch = useDispatch();

  const handleSelected = (image) => {
    setShowPhotoModal(false);
    setSelectedPhoto(image);
  };

  const imageUploadRef = useRef(null);
  const storePhoto = () => {
    imageUploadRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const formdata = new FormData();
    formdata.append("photos[]", file, file.name);
    storePhotoMutation({ photos: formdata, token });
    reader.onload = (e) => {
      dispatch(addphoto(e.target.result));

      setSelectedPhoto([...selectedPhoto, e.target.result]);
    };
    reader.readAsDataURL(file);
    // const data = await storePhotoMutation({ photos: file, token });
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" absolute h-screen p-10 overflow- top-0 left-0 inset-0 bg-black bg-opacity-70 flex z-[19999] justify-center"
      >
        <div className=" bg-[#323232] overflow-y-scroll p-10 rounded-lg w-[1000px] flex flex-col gap-10 items-center">
          <h2 className="text-white text-[22px] font-[600] ">Choose photo</h2>
          <div className="grid grid-cols-3 gap-20 flex-wrap">
            {Array.isArray(data)
              ? data?.map((image) => (
                  <div
                    onClick={() => setClickedPhoto(image)}
                    key={image.id}
                    className={`${
                      clickedPhoto === image ? "border-4 border-white" : ""
                    } w-[200px] h-[200px]`}
                  >
                    <img className="w-full h-full" src={image.url} alt="" />
                  </div>
                ))
              : "There is currently no photo."}
          </div>
          <div className="flex justify-between flex-row w-full">
            <div className="flex flex-row gap-10">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-white border-white border rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                className="text-white bg-[#B19777] px-4 py-2 rounded-md"
                onClick={storePhoto}
              >
                <BiPlus />
              </button>
            </div>{" "}
            {clickedPhoto ? (
              <button
                className="text-white bg-[#B19777] px-4 py-2 rounded-md"
                onClick={(_) => handleSelected(clickedPhoto)}
              >
                Confirm
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <input
            type="file"
            accept="image/png, image/jpg"
            onChange={handleImageChange}
            className="hidden"
            ref={imageUploadRef}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalPhoto;

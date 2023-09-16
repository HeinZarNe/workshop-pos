import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // brandPhoto : [],
  // userPhoto : [],
  // productPhoto : [],
  // stock : [],
  photo: [],
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    addphoto: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.photo = [...state.photo, ...payload];
      } else {
        state.photo = [...state.photo, payload];
      }
    },
    deletePhoto: (state, { payload }) => {
      state.photo = state.photo.filter((image) => image.id !== payload);
    },
    // addBrandPhoto : (state,{payload}) => {
    //     state.brandPhoto = payload
    // },
    // addProductPhoto : (state,{payload}) => {
    //     state.productPhoto = payload
    // },
    // addUserPhoto : (state,{payload}) => {
    //     state.userPhoto = payload
    // },
  },
});

export const { addphoto, deletePhoto } = mediaSlice.actions;
export default mediaSlice.reducer;

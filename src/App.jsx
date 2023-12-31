import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import UserOverview from "./components/UserOverview";
import EditProfile from "./pages/EditProfile";
import Media from "./pages/Media";
import User from "./pages/User";
import Guard from "./components/Guard";
import CreateUser from "./pages/CreateUser";
import AddProduct from "./pages/AddProduct";
import Inventory from "./pages/Inventory";
import ProductDetails from "./components/products/ProductDetails";
import Stock from "./pages/Stock";
import Cashier from "./pages/Cashier";
import Checkout from "./pages/Checkout";
import ManageBrand from "./pages/ManageBrand";
import Recent from "./pages/Recent";
import { useDispatch, useSelector } from "react-redux";
import { addphoto } from "./services/mediaSlice";
import { useGetPhotoQuery, useGetProductQuery } from "./services/authApi";
import { useState } from "react";
import Daily from "./pages/finance/Daily";
import Monthly from "./pages/finance/Monthly";
import Yearly from "./pages/finance/Yearly";
import Custom from "./pages/finance/Custom";
import StockReport from "./pages/report/StockReport";
import SaleReport from "./pages/report/SaleReport";
import BannedUser from "./pages/BannedUser";
import EditUser from "./pages/EditUser";
import Swal from "sweetalert2";

const App = () => {
  const path = location?.pathname;
  const token = localStorage.getItem("token");
  // const dispatch = useDispatch();
  // // const  data  = useGetPhotoQuery(token);
  const { data, isError } = useGetProductQuery({ token });
  // const { photo } = useSelector((state) => state.media);

  // // useEffect(() => {
  // //   data?.forEach((item) => {
  // //     // Check if the item is already in the photo array
  // //     if (!photo.some((image) => image.id === item.id)) {
  // //       dispatch(addphoto(item));
  // //     }
  // //   });
  // // }, [data]);
  // // console.log(data);
  const routesToProtect = [
    "/",
    "/media",
    "/profile",
    "/profile/edit",
    "/users",
    "/users/create",
    "/users/banned",
    "/products",
    "/products/create",
    "/products/details",
    "/stock",
    "/sale/cashier",
    "/sale/recent",
    "/checkout",
    "/brand",
    "/daily",
    "/monthly",
    "/yearly",
    "/stock-report",
    "/sale-report",
    "/custom",
  ];
  const navigate = useNavigate();
  if (token && isError && routesToProtect.includes(path)) {
    Swal.fire({
      title: "Something is wrong! <br/> Please try to  Login again",
      icon: "error",
      buttonsStyling: false,
      color: "#bb86fc",
      width: "25em",
      background: "#1e1e1e",
      showConfirmButton: true,
      confirmButtonText: "Go to Login Page",
      customClass: {
        title: "text-primary",
        confirmButton:
          "bg-primary text-secondary px-6 py-2 font-mono font-semibold rounded-lg",
      },
    }).then((result) => {
      navigate("/login");
    });
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Guard>
            <Home />
          </Guard>
        }
      />
      <Route
        path="/media"
        element={
          <Guard>
            <Media />
          </Guard>
        }
      />
      <Route
        path="/profile"
        element={
          <Guard>
            <Profile />
          </Guard>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <Guard>
            <EditProfile />
          </Guard>
        }
      />
      <Route
        path="/users"
        element={
          <Guard>
            <User />
          </Guard>
        }
      />
      <Route
        path="/users/create"
        element={
          <Guard>
            <CreateUser />
          </Guard>
        }
      />

      <Route
        path="/users/banned"
        element={
          <Guard>
            <BannedUser />
          </Guard>
        }
      />
      <Route
        path="/products"
        element={
          <Guard>
            <Inventory />
          </Guard>
        }
      />
      <Route
        path="/products/create"
        element={
          <Guard>
            <AddProduct />
          </Guard>
        }
      />
      <Route
        path="/products/details"
        element={
          <Guard>
            <ProductDetails />
          </Guard>
        }
      />
      <Route
        path="/stock"
        element={
          <Guard>
            <Stock />
          </Guard>
        }
      />
      <Route
        path="/sale/cashier"
        element={
          <Guard>
            <Cashier />
          </Guard>
        }
      />
      <Route
        path="/sale/recent"
        element={
          <Guard>
            <Recent />
          </Guard>
        }
      />
      <Route
        path="/checkout"
        element={
          <Guard>
            <Checkout />
          </Guard>
        }
      />
      <Route
        path="/brand"
        element={
          <Guard>
            <ManageBrand />
          </Guard>
        }
      />
      <Route
        path="/daily"
        element={
          <Guard>
            <Daily />
          </Guard>
        }
      />
      <Route
        path="/monthly"
        element={
          <Guard>
            <Monthly />
          </Guard>
        }
      />
      <Route
        path="/yearly"
        element={
          <Guard>
            <Yearly />
          </Guard>
        }
      />
      <Route
        path="/stock-report"
        element={
          <Guard>
            <StockReport />
          </Guard>
        }
      />
      <Route
        path="/sale-report"
        element={
          <Guard>
            <SaleReport />
          </Guard>
        }
      />
      <Route
        path="/custom"
        element={
          <Guard>
            <Custom />
          </Guard>
        }
      />
    </Routes>
  );
};
export default App;
// 178.128.21.116
// mms23@ygn

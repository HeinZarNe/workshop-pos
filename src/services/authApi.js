import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authapi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://f.mmsdev.site/api/v1/" }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["authapi"],
    }),
    logout: build.mutation({
      query: (token) => ({
        url: "logout",
        method: "POST",
        body: token,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["authapi"],
    }),
    getPhoto: build.query({
      query: (token) => ({
        url: "photo",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    storePhoto: build.mutation({
      query: ({ photos, token }) => ({
        url: "photo",
        method: "POST",
        body: photos,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["authapi"],
    }),
    createUser: build.mutation({
      query: ({ userData, token }) => ({
        url: "user/register",
        method: "POST",
        body: userData,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["authapi"],
    }),
    getUser: build.query({
      query: ({ token }) => ({
        url: "user",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getProduct: build.query({
      query: ({ detailId, token, page }) => ({
        url: detailId
          ? "product/" + detailId
          : page
          ? `product?page=${page}`
          : "product",

        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getStock: build.query({
      query: (token) => ({
        url: "stock",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    updateStock: build.mutation({
      query: ({ data, token }) => ({
        url: "stock/" + data?.id,
        method: "PATCH",
        body: {
          product_id: data?.id,
          quantity: data?.quantity,
          more: data?.message,
        },
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getMonthlySales: build.query({
      query: (token) => ({
        url: "finance/monthly-sales",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getYearlySales: build.query({
      query: (token) => ({
        url: "finance/yearly-sales",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getDailySales: build.query({
      query: (token) => ({
        url: "finance/daily-sales",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    storeProduct: build.mutation({
      query: ({ productData, token }) => ({
        url: "product",
        method: "POST",
        body: productData,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    updateProduct: build.mutation({
      query: ({ productData, token }) => ({
        url: "product",
        method: "PATCH",
        body: productData,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getBrand: build.query({
      query: ({ token, page, detail, id }) => ({
        url: detail
          ? "brand/" + id
          : page === 0
          ? "brand"
          : `brand?page=${page}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    storeBrand: build.mutation({
      query: ({ brandData, token }) => ({
        url: "brand",
        method: "POST",
        body: brandData,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    deleteBrand: build.mutation({
      query: ({ id, token }) => ({
        url: "brand/" + id,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    //need to fix
    updateBrand: build.mutation({
      query: ({ brandInfo, token }) => ({
        url: "brand/" + id,
        method: "PATCH",
        body: brandInfo,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    customFetch: build.query({
      query: (url, token) => ({
        url,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetStockQuery,
  useCustomFetchQuery,
  useGetPhotoQuery,
  useStorePhotoMutation,
  useGetProductQuery,
  useGetMonthlySalesQuery,
  useGetYearlySalesQuery,
  useGetDailySalesQuery,
  useCreateUserMutation,
  useStoreProductMutation,
  useUpdateProductMutation,
  useGetUserQuery,
  useGetBrandQuery,
  useStoreBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
  useUpdateStockMutation,
} = authApi;

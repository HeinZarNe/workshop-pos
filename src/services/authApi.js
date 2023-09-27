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

    banUser: build.mutation({
      query: ({ id, token }) => ({
        url: "user/ban/" + id,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["authapi"],
    }),
    unbanUser: build.mutation({
      query: ({ id, token }) => ({
        url: "user/unban/" + id,
        method: "PUT",

        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["authapi"],
    }),
    getUser: build.query({
      query: ({ token, page, keyword }) => ({
        url: `user${
          page ? "?page=" + page : keyword ? "?keyword=" + keyword : ""
        }`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getBannedUser: build.query({
      query: ({ token, page, keyword }) => ({
        url: `user/banned-users${
          page ? "?page=" + page : keyword ? "?keyword=" + keyword : ""
        }`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getUserDetail: build.query({
      query: ({ token, id, self }) => ({
        url: `user/details${self ? "" : "/" + id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getProduct: build.query({
      query: ({ detailId, token, page, keyword }) => ({
        url: detailId
          ? "product/" + detailId
          : page
          ? `product?page=${page}`
          : keyword
          ? "product?keyword=" + keyword
          : "product",

        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getStock: build.query({
<<<<<<< HEAD
      query: ({ token, page, keyword }) => ({
        url: `stock${
          page ? "?page=" + page : keyword ? "?keyword=" + keyword : ""
        }`,
=======
      query: (token) => ({
        url: "report/stock-level-table",
        headers: { authorization: `Bearer ${token}` },
      }),
      // query: (token,page) => ({
      //   url: page? `product?page=${page} `: "product",
      //   headers: { authorization: `Bearer ${token}` },
      // }),
      providesTags: ["authapi"],
    }),
    getBrandReport: build.query({
      query: (token) => ({
        url: "report/brand-report",
        header: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getStockBestSeller: build.query({
      query: (token) => ({
        url: "report/stock-level-bar",
>>>>>>> 2f2f480c2d15aac0dd23648be233b7f953c10cf4
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
        url: "product/" + productData.id,
        method: "PATCH",
        body: productData,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    updateUser: build.mutation({
      query: ({ updateData, token }) => ({
        url: "profile/" + updateData.id,
        method: "PUT",
        body: updateData,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getBrand: build.query({
      query: ({ token, page, detail, id, keyword }) => ({
        url: detail
          ? "brand/" + id
          : page > 0
          ? `brand?page=${page}`
          : keyword
          ? "brand?keyword=" + keyword
          : "brand",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getOverviewData: build.query({
      query: ({ token }) => ({
        url: "overview-page",

        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getMonthlyOverview: build.query({
      query: ({ token }) => ({
        url: "monthly-overview",

        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getWeeklyOverview: build.query({
      query: ({ token }) => ({
        url: "weekly-overview",

        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["authapi"],
    }),
    getYearlyOverview: build.query({
      query: ({ token }) => ({
        url: "yearly-overview",

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
        url: "brand/" + brandInfo.id,
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
  useGetBrandReportQuery,
  useGetStockBestSellerQuery,
  useCustomFetchQuery,
  useGetPhotoQuery,
  useStorePhotoMutation,
  useGetProductQuery,
  useGetMonthlySalesQuery,
  useGetYearlySalesQuery,
  useGetDailySalesQuery,
  useBanUserMutation,
  useUnbanUserMutation,
  useCreateUserMutation,
  useStoreProductMutation,
  useUpdateProductMutation,
  useGetUserQuery,
  useGetWeeklyOverviewQuery,
  useGetMonthlyOverviewQuery,
  useGetYearlyOverviewQuery,
  useGetBannedUserQuery,
  useGetUserDetailQuery,
  useGetBrandQuery,
  useGetOverviewDataQuery,
  useStoreBrandMutation,
  useDeleteBrandMutation,
  useUpdateUserMutation,
  useUpdateBrandMutation,
  useUpdateStockMutation,
} = authApi;

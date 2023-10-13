import React, { useEffect, useState } from "react";
import Rootlayout from "../../layout/Rootlayout";
import { Link, NavLink } from "react-router-dom";
import { BsClipboard2Pulse, BsThreeDotsVertical } from "react-icons/bs";
import { HiArrowSmallUp } from "react-icons/hi2";
import { Chart } from "primereact/chart";

// import Chart from "./BarChart";
// import Text from "./Text";
import { AiOutlineArrowRight } from "react-icons/ai";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import {
  useGetBrandReportQuery,
  useGetSaleReportQuery,
} from "../../services/authApi";
import { useTodaySaleQuery, useWeeklySaleQuery } from "../../services/authApi";
import { Pagination } from "@mantine/core";

const SaleReport = () => {
  // const [view, setView] = useState("list");
  // const [showSidebar, setShowSidebar] = useState(false);
  // const [stockData, setStockData] = useState({});
  // const [keyword, setKeyword] = useState("");
  // const [addStock, setAddStock] = useState(false);
  const [page, setPage] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  // other
  const token = localStorage.getItem("token");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [urlLink, setUrlLink] = useState("weekly-report");
  const { data: saleReport, refetch } = useGetSaleReportQuery({ token, page });
  // console.log(urlLink);
  // const [click, setClick] = useState(false);
  const { data: todaySale } = useTodaySaleQuery(token);
  const { data: sale } = useWeeklySaleQuery({ token, urlLink });
  // console.log(sale);

  const { data: ch } = useGetBrandReportQuery(localStorage.getItem("token"));
  const maxPercent = (
    (todaySale?.todayMaxSales?.total * 100) /
    todaySale?.todayTotalSales
  ).toFixed(2);
  const minPercent = (
    (todaySale?.todayMinSales?.total * 100) /
    todaySale?.todayTotalSales
  ).toFixed(2);

  // const [editstate, setEditState] = useState(false);
  // useEffect(() => {
  //   refetch();
  //   return () => {};
  // }, [addStock]);
  useEffect(() => {
    setTotalPage(saleReport?.last_page);
    return () => {};
  }, [saleReport]);

  // barchart
  useEffect(() => {
    if (urlLink === "weekly-report" && sale?.weeklySales) {
      // useEffect(() => {
      const mon = sale?.weeklySales[0]?.daySales;
      const tue = sale?.weeklySales[1]?.daySales;
      const wed = sale?.weeklySales[2]?.daySales;
      const thu = sale?.weeklySales[3]?.daySales;
      const fri = sale?.weeklySales[4]?.daySales;
      const sat = sale?.weeklySales[5]?.daySales;
      const sun = sale?.weeklySales[6]?.daySales;

      const data = {
        labels: ["S", "M", "T", "W", "T", "F", "S"],
        datasets: [
          {
            data: [sun, mon, tue, wed, thu, fri, sat],
            backgroundColor: ["#bb86fc"],
            label: "Sales",
          },
        ],
      };
      const options = {
        maintainAspectRatio: true,
        aspectRatio: 1.3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      setChartData(data);
      setChartOptions(options);
      // }, []);
    } else if (urlLink === "monthly-report" && sale?.monthlySales) {
      if (sale) {
        // useEffect(() => {
        const data = {
          labels: [
            "d1",
            "d2",
            "d3",
            "d4",
            "d5",
            "d6",
            "d7",
            "d8",
            "d9",
            "d10",
            "d11",
            "d12",
            "d13",
            "d14",
            "d15",
            "d16",
            "d17",
            "d16",
            "d18",
            "d19",
            "d20",
            "d21",
            "d22",
            "d23",
            "d24",
            "d25",
            "d26",
            "d27",
            "d28",
            "d29",
          ],

          datasets: [
            {
              data: [
                sale?.monthlySales[1]?.total_sales,
                sale?.monthlySales[2]?.total_sales,
                sale?.monthlySales[3]?.total_sales,
                sale?.monthlySales[4]?.total_sales,
                sale?.monthlySales[5]?.total_sales,
                sale?.monthlySales[6]?.total_sales,
                sale?.monthlySales[7]?.total_sales,
                sale?.monthlySales[8]?.total_sales,
                sale?.monthlySales[9]?.total_sales,
                sale?.monthlySales[10]?.total_sales,
                sale?.monthlySales[11]?.total_sales,
                sale?.monthlySales[12]?.total_sales,
                sale?.monthlySales[13]?.total_sales,
                sale?.monthlySales[14]?.total_sales,
                sale?.monthlySales[15]?.total_sales,
                sale?.monthlySales[16]?.total_sales,
                sale?.monthlySales[17]?.total_sales,
                sale?.monthlySales[18]?.total_sales,
                sale?.monthlySales[19]?.total_sales,
                sale?.monthlySales[20]?.total_sales,
                sale?.monthlySales[21]?.total_sales,
                sale?.monthlySales[22]?.total_sales,
                sale?.monthlySales[23]?.total_sales,
                sale?.monthlySales[24]?.total_sales,
                sale?.monthlySales[25]?.total_sales,
                sale?.monthlySales[26]?.total_sales,
                sale?.monthlySales[27]?.total_sales,
                sale?.monthlySales[28]?.total_sales,
                sale?.monthlySales[29]?.total_sales,
              ],
              backgroundColor: ["#bb96fc"],
              label: "Sales",
            },
          ],
        };
        const options = {
          maintainAspectRatio: true,
          aspectRatio: 1.3,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
        // console.log(data, options);
        setChartData(data);
        setChartOptions(options);
        // }, [urlLink, sale]);
      }
    } else if (urlLink === "yearly-report" && sale?.yearlySales) {
      if (sale) {
        // useEffect(() => {
        const data = {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],

          datasets: [
            {
              data: [
                sale?.yearlySales[1]?.monthSales,
                sale?.yearlySales[2]?.monthSales,
                sale?.yearlySales[3]?.monthSales,
                sale?.yearlySales[4]?.monthSales,
                sale?.yearlySales[5]?.monthSales,
                sale?.yearlySales[6]?.monthSales,
                sale?.yearlySales[7]?.monthSales,
                sale?.yearlySales[8]?.monthSales,
                sale?.yearlySales[9]?.monthSales,
                sale?.yearlySales[10]?.monthSales,
                sale?.yearlySales[11]?.monthSales,
                sale?.yearlySales[12]?.monthSales,
              ],
              backgroundColor: ["#bb86fc"],
              label: "Sales",
            },
          ],
        };
        const options = {
          maintainAspectRatio: true,
          aspectRatio: 1.3,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
        // console.log(data, options);
        setChartData(data);
        setChartOptions(options);
        // }, [urlLink, sale]);
      }
    }
  }, [urlLink, sale]);
  let hDate;
  if (urlLink === "weekly-report") {
    hDate = sale?.highestSale?.highestSellingDate;
  } else if (urlLink === "monthly-report") {
    hDate = sale?.highestSale?.highestSellingDateOfMonth;
  } else {
    hDate = sale?.highestSale?.highestSellingMonth;
  }
  let lDate;
  if (urlLink === "weekly-report") {
    lDate = sale?.lowestSale?.lowestSellingDate;
  } else if (urlLink === "monthly-report") {
    lDate = sale?.lowestSale?.lowestSellingDateOfMonth;
  } else {
    lDate = sale?.lowestSale?.lowestSellingDate;
  }
  return (
    <Rootlayout>
      <div className="mx-10 my-5">
        {/* first  */}
        <div className=" flex  justify-between">
          <div className="">
            <h1 className="text-2xl font-semibold mt-0 pt-0 text-tcolor">
              Sale
            </h1>
            <p className=" text-gray-400">Report/ Sale</p>
          </div>
          <div className=" flex gap-3">
            <div className="grid grid-cols-3  border divide-primary divide-x text-center border-primary rounded-md">
              <p
                className={
                  urlLink == "yearly-report"
                    ? "p-3 px-4 text-xl text-primary font-semibold cursor-pointer"
                    : "p-3 px-4 text-xl  font-semibold cursor-pointer"
                }
                onClick={() => setUrlLink("yearly-report")}
              >
                Year
              </p>
              <p
                className={
                  urlLink == "monthly-report"
                    ? "p-3 px-4 text-xl text-primary font-semibold cursor-pointer"
                    : "p-3 px-4 text-xl  font-semibold cursor-pointer"
                }
                onClick={() => setUrlLink("monthly-report")}
              >
                Month
              </p>
              <p
                className={
                  urlLink == "weekly-report"
                    ? "p-3 px-4 text-xl text-primary font-semibold cursor-pointer"
                    : "p-3 px-4 text-xl  font-semibold cursor-pointer"
                }
                onClick={() => setUrlLink("weekly-report")}
              >
                Week
              </p>
            </div>
          </div>
        </div>
        {/* second  */}
        <div className="grid grid-cols-12  mt-5 gap-4">
          <div className="col-span-4 border border-secondary rounded-lg p-4">
            <div className="flex mb-3 items-center justify-between">
              <p className="text-2xl text-tcolor">Today Sales</p>
              <BsThreeDotsVertical className="text-xl" />
            </div>
            <h1 className="text-5xl font-semibold text-tcolor">
              {todaySale?.todayTotalSales}
            </h1>
            <p className="text-sm ms-1 mt-1">Kyats</p>
            <div className="mt-4">
              <div className="flex border-t border-secondary py-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <BsClipboard2Pulse className="text-primary" />{" "}
                  <p className="text-lg">
                    {todaySale?.todayMaxSales?.voucherNumber.slice(0, 5)}
                  </p>
                </div>
                <div className="flex gap-7">
                  <p className="text-lg">{todaySale?.todayMaxSales?.total}K</p>
                  <div className="text-lg flex items-center">
                    {maxPercent}%{" "}
                    <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                  </div>
                </div>
              </div>
              <div className="flex border-t border-secondary py-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <p className="text-lg ms-3 font-semibold">Average</p>
                </div>
                <div className="flex gap-1 me-6">
                  <p className="text-lg font-semibold">
                    {todaySale?.todayAverageSales}
                  </p>
                  <div className="text-lg font-semibold flex items-center">
                    Kyats
                    {/* <HiArrowSmallUp className="ms-2 text-green-500" />{" "} */}
                  </div>
                </div>
              </div>
              <div className="flex border-t border-secondary py-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <BsClipboard2Pulse className="text-primary" />{" "}
                  <p className="text-lg">
                    {" "}
                    {todaySale?.todayMinSales?.voucherNumber.slice(0, 5)}
                  </p>
                </div>
                <div className="flex gap-7">
                  <p className="text-lg">{todaySale?.todayMinSales?.total}k</p>
                  <div className="text-lg flex items-center">
                    {(
                      (todaySale?.todayMinSales?.total * 100) /
                      todaySale?.todayTotalSales
                    ).toFixed(2)}
                    % <HiArrowSmallUp className="ms-2 text-green-500" />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end ">
              <button className="text-lg font-semibold p-2 px-3 border rounded-lg mt-3 border-primary text-primary hover:bg-primary hover:text-black duration-100 ">
                RECENT SALES
              </button>
            </div>
          </div>
          <div className="col-span-8 p-4 border  border-secondary rounded-lg ">
            <div className="">
              <h1 className="text-2xl text-primary">Weekly Sales</h1>
              <p className="">Total {sale?.averageAmount} kyat Sales</p>
            </div>
            <div className=" grid grid-cols-2 mt-4">
              {/* <div className="hidden">
                <BarChart className="w-full hidden" />
              </div> */}
              <div className="w-full">
                <div className="card ">
                  <Chart type="bar" data={chartData} options={chartOptions} />
                </div>
              </div>
              {/* <Text/> */}
              <div className=" p-4">
                <div className="flex mb-5 items-center">
                  <p className="h-10 mt-1 w-11 text-xl flex justify-center items-center border border-secondary rounded-md">
                    T
                  </p>
                  <div className="flex items-center w-full px-4 justify-between">
                    <div className="flex items-start">
                      <div className="flex flex-col">
                        <p className="text-md text-tcolor font-semibold">
                          Highest
                        </p>
                        <p className="text-sm">{hDate}</p>
                      </div>
                      <p className="flex items-center text-green-500">
                        {" "}
                        <HiArrowSmallUp className="mx-1 " /> 25%
                      </p>
                    </div>
                    <div className="flex items-end flex-col">
                      <p className="text-md text-tcolor font-semibold">
                        {sale?.highestSale?.highestSaleAmount}
                      </p>
                      <p className="text-sm">Kyats</p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-5 items-center">
                  <p className="h-10 mt-1 w-11 text-xl flex justify-center items-center border border-secondary rounded-md">
                    T
                  </p>
                  <div className="flex items-center w-full px-4 justify-between">
                    <div className="flex items-start">
                      <div className="flex flex-col">
                        <p className="text-md text-tcolor font-semibold">
                          Average
                        </p>
                        <p className="text-sm">Income</p>
                      </div>
                      {/* <p className="flex items-center text-green-500">
                        {" "}
                        <HiArrowSmallUp className="mx-1 " /> 25%
                      </p> */}
                    </div>
                    <div className="flex items-end flex-col">
                      <p className="text-md text-tcolor font-semibold">
                        {sale?.averageAmount}
                      </p>
                      <p className="text-sm">Kyats</p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-5  items-center">
                  <p className="h-10 mt-1 w-11 text-xl flex justify-center items-center border border-secondary rounded-md">
                    T
                  </p>
                  <div className="flex items-center w-full px-4 justify-between">
                    <div className="flex items-start">
                      <div className="flex flex-col">
                        <p className="text-md text-tcolor font-semibold">
                          Lowest
                        </p>
                        <p className="text-sm">{lDate}</p>
                      </div>
                      <p className="flex items-center text-red-500">
                        {" "}
                        <HiArrowSmallUp className="mx-1 rotate-180 " /> 25%
                      </p>
                    </div>
                    <div className="flex items-end flex-col">
                      <p className="text-md text-tcolor font-semibold">
                        {sale?.lowestSale?.lowestSaleAmount}
                      </p>
                      <p className="text-sm ">Kyats</p>
                    </div>
                  </div>
                </div>
                <button className="btn block ms-auto btn-outline hover:bg-primary hover:border-0 px-5 text-primary border-primary">
                  SEE MORE
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* third */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="text-3xl text-tcolor font-semibold mb-4 ms-2 mt-10">
              Product Sales
            </div>
            <div className=" border-2 rounded-t-lg border-primary">
              <div className="relative overflow-x-auto shadow-md sm:rounded-md">
                <table className="w-full text-sm text-left text-primary ">
                  <thead className="text-xs text-gray-900 uppercase bg-primary">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        <div className="text-secondary">NO</div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="text-secondary">NAME</div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="text-secondary"> BRAND NAME</div>
                      </th>
                      <th scope="col" className="px-6 text-end py-3">
                        <div className="text-secondary">SALE PRICE</div>
                      </th>
                      {/* <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {saleReport?.data?.map((data) => {
                      return (
                        <tr
                          key={data.id}
                          className=" border-b hover:bg-white/10 "
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-tcolor whitespace-nowra"
                          >
                            {data.id}
                          </th>
                          <td className="px-6 py-4 text-tcolor">{data.name}</td>
                          <td className="px-6 py-4 text-tcolor">
                            {data.brand_name}
                          </td>
                          <td className="px-6 py-4 text-tcolor text-end">
                            {data.sale_price}
                          </td>
                          {/* <td className="px-6 py-4 text-right">
                            <NavLink
                              to={"/profile"}
                              className="font-medium flex ps-5 justify-center text-blue-600  hover:underline"
                            >
                              <button className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-black">
                                <AiOutlineArrowRight />
                              </button>
                            </NavLink>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pagination me-4">
              <Pagination
                total={totalPage || 1}
                onChange={(e) => {
                  setPage(e);
                  refetch();
                }}
                // onPreviousPage={(e) => {
                //   setPage((prev) => prev > 0 && prev - 1);
                //   refetch();
                // }}
                // onNextPage={(e) => {

                //   refetch();
                // }}
                boundaries={1}
                defaultValue={1}
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-3xl text-tcolor font-semibold mb-4 ms-2 mt-10">
              Brand Sales
            </div>
            <div className="border-2 border-primary p-4 rounded-md">
              <DonutChart />
              <div className="flex w-[100%] mx-auto mt-3 justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#660066] mt-1 rounded-full"></div>
                  {ch?.brandsInfo[0].name}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#BE29EC] mt-1 rounded-full"></div>
                  {ch?.brandsInfo[1].name}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#EFBBFF] mt-1 rounded-full"></div>
                  {ch?.brandsInfo[2].name}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#E53F71] mt-1 rounded-full"></div>
                  {ch?.brandsInfo[3].name}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </Rootlayout>
  );
};

export default SaleReport;

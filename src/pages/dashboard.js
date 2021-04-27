import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import style from "./css/dashboard.module.scss";
import { SearchIcon } from "@chakra-ui/icons";
import supabase from "../supabase";
import date from "date-and-time";

const Dashboard = () => {
  const [dataMetrics, setDataMetrics] = useState({
    orderCount: "-",
    orderCountToday: "-",
    totalRevenue: "-",
    todayRevenue: "-",
  });
  const [isLoading, setIsLoading] = useState(false);

  //functions
  const getAllOrderCount = async () => {
    const { data, error, count: allorder } = await supabase
      .from("orders")
      .select("id", { count: "exact" });
    console.log(allorder);

    return allorder;
  };

  const getAllOrderCountToday = async () => {
    const today = date.format(new Date(), "YYYY-M-DD");
    const { data, error, count: allordertoday } = await supabase
      .from("orders")
      .select("order_date", { count: "exact" })
      .eq("order_date", today);
    console.log(allordertoday);

    return allordertoday;
  };

  const getTotalReveneu = async () => {
    const { data: amounts, error } = await supabase
      .from("order_products")
      .select("product_price");
    setDataMetrics({ ...dataMetrics, totalvalues: amounts });
    const sum = amounts.reduce((acc, obj) => {
      return acc + obj.product_price;
    }, 0);
    console.log(sum);

    return sum;
  };

  const getTodayReveneu = async () => {
    const today = date.format(new Date(), "YYYY-M-DD");
    const { data, error } = await supabase
      .from("orders")
      .select(`shipping_charge,order_products (product_price)`)
      .eq("order_date", today);
    const sum = data.reduce(
      (acc, obj) =>
        acc +
        obj.order_products.reduce((acc, obj) => acc + obj.product_price, 0),
      data.reduce((acc, obj) => acc + obj.shipping_charge, 0)
    );

    return sum;
  };
  //functions ends here

  useEffect(() => {
    setIsLoading(true);

    const getAllData = async () => {
      const orderCount = await getAllOrderCount();
      const todayOrder = await getAllOrderCountToday();
      const totalReveneu = await getTotalReveneu();
      const todayReveneu = await getTodayReveneu();

      setDataMetrics({ ...dataMetrics, orderCount: orderCount.toString() });
      setDataMetrics({
        ...dataMetrics,
        orderCountToday: todayOrder.toString(),
      });
      setDataMetrics({ ...dataMetrics, totalRevenue: totalReveneu.toString() });
      setDataMetrics({ ...dataMetrics, todayRevenue: todayReveneu.toString() });
      console.log({
        dataMetrics,
      });
      setIsLoading(false);
    };

    getAllData();
  }, []);

  return (
    <div className={style.container}>
      <div style={{ width: "20%" }}>
        <SideBar />
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <InputGroup size="lg" p="2" mt="8" w="35%">
          <InputLeftElement width="4.5rem">
            <SearchIcon mt="5" color="gray.400" />
          </InputLeftElement>
          <Input
            pr="4.5rem"
            placeholder="Search"
            borderRadius="full"
            borderColor="gray.100"
            bg="gray.100"
          />
        </InputGroup>
        <div className={style.wrapper}>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Total orders</h1>
            <h1 className={style.report_stat}>
              {dataMetrics.orderCount !== "-" ? dataMetrics.orderCount : "-"}
            </h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Order Today</h1>
            <h1 className={style.report_stat}>{dataMetrics.orderCountToday}</h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Total reveneu</h1>
            <h1 className={style.report_stat}>
              {`₹${dataMetrics.totalRevenue}`}
            </h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Reveneu Today</h1>
            <h1
              className={style.report_stat}
            >{`₹${dataMetrics.todayRevenue}`}</h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

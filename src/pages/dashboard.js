import { Input } from "@chakra-ui/input";
import React from "react";
import SideBar from "../components/sideBar";
import style from "./css/dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={style.container}>
      <SideBar />
    </div>
  );
};

export default Dashboard;

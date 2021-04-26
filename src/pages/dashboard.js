import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import React from "react";
import SideBar from "../components/sideBar";
import style from "./css/dashboard.module.scss";
import { SearchIcon } from "@chakra-ui/icons";
import { InputLeftElement } from "@chakra-ui/input";

const Dashboard = () => {
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
            <h1 className={style.report_stat}>99</h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Order Today</h1>
            <h1 className={style.report_stat}>5</h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Total reveneu</h1>
            <h1 className={style.report_stat}>₹144000</h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
          <div className={style.report_wrapper}>
            <h1 className={style.report_heading}>Reveneu Today</h1>
            <h1 className={style.report_stat}>₹10988</h1>
            <h1 className={style.report_percentage}>+33%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

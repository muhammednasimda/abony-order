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
      <InputGroup size="lg" p="2" alignSelf="flex-start" mt="8" w="25%">
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
    </div>
  );
};

export default Dashboard;

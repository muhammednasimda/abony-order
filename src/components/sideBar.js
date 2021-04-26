import React from "react";
import styles from "./sidebar.module.scss";
import {
  HamburgerIcon,
  CalendarIcon,
  CheckCircleIcon,
  TimeIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Stack } from "@chakra-ui/layout";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <CheckCircleIcon w={8} h={8} color="white" mt="9" />
      <h1 className={`${styles.header}`}>Abony Dashboard</h1>
      <Flex direction="column">
        <Stack direction="row" mt="20" d="flex" alignItems="center">
          <HamburgerIcon w={5} h={5} color="white" mr="5" />
          <h1 className={`${styles.heading_small}`}>Dashboard</h1>
        </Stack>
        <Stack direction="row" mt="8" d="flex" alignItems="center">
          <CalendarIcon w={5} h={5} color="white" mr="5" />
          <h1 className={`${styles.heading_small}`}>Shipping Time</h1>
        </Stack>
        <Stack direction="row" mt="8" d="flex" alignItems="center">
          <TimeIcon w={5} h={5} color="white" mr="5" />
          <h1 className={`${styles.heading_small}`}>Reveneu</h1>
        </Stack>
        <Stack direction="row" mt="8" d="flex" alignItems="center">
          <CheckIcon w={5} h={5} color="white" mr="5" />
          <h1 className={`${styles.heading_small}`}>Payments</h1>
        </Stack>
      </Flex>
    </div>
  );
};

export default SideBar;

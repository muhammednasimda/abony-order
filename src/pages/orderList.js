import { React, useRef, useState, useEffect } from "react";
import styles from "./css/addOrder.module.scss";
import supabase from "../supabase";

import { useHistory } from "react-router-dom";
import { Box, Flex, Stack, SimpleGrid } from "@chakra-ui/layout";
import {
  Text,
  Image,
  Badge,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  IconButton,
  CircularProgress,
} from "@chakra-ui/react";
import { AddIcon, PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import Fonts from "../components/Fonts";
import Header from "../components/Header";
import useStore from "../ordersState";

const OrderList = () => {
  const history = useHistory();

  const [ordersFetched, setOrdersFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedOrders, setSearchedOrders] = useState([]);
  const [pageNo, setPageNo] = useState(12);
  const [searchId, setSearchId] = useState();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue == "") {
      setSearchedOrders([]);
    } else {
      doSearch();
    }
  }, [searchValue]);

  const doSearch = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`*,order_products (*)`)
      .ilike(`customer_name`, `%${searchValue}%`)
      .order("id", { ascending: false });
    console.log(data);
    setSearchedOrders(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let { data: orders, error } = await supabase
        .from("orders")
        .select(`*,order_products (*)`)
        .range(pageNo - 12, pageNo - 1)
        .order("id", { ascending: false });
      console.log(orders[0]);
      setOrdersFetched((old) => [...old, ...orders]);
      setIsLoading(false);
    };
    fetchData();
  }, [pageNo]);

  const OrderCard = ({ order }) => {
    return (
      <Box
        w="95%"
        margin="5px"
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor={
          order.order_products.some((prd) => prd.product_barcode === "")
            ? "red.100"
            : "white"
        }
        onClick={() => history.push(`/orderedit/${order.id}`)}
      >
        <Flex height="auto" p="5px" width="100%">
          {order.order_products.length > 0 ? (
            <Image
              p="5px"
              height="100px"
              width="100px"
              borderRadius="15px"
              src={`https://firebasestorage.googleapis.com/v0/b/abony-cd5c4.appspot.com/o/${order.order_products[0].product_image}?alt=media`}
            />
          ) : (
            <Image
              p="5px"
              height="100px"
              width="100px"
              borderRadius="15px"
              src={`https://via.placeholder.com/150`}
            />
          )}
          <Flex flexDirection="column" ml="3" mt="1" width="100%">
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              width="100%"
            >
              <Text fontSize="lg" fontWeight="medium">
                {order.customer_name}
              </Text>
              <Badge
                fontSize={10}
                variant="outline"
                alignSelf="start"
                colorScheme="gray"
                color="black"
              >
                Order id: {order.id}
              </Badge>
            </Stack>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              width="100%"
            >
              <Text mt="1" fontWeight="bold">
                ₹
                {order.order_products.reduce(
                  (acc, curr) => acc + curr.product_price,
                  0
                )}
              </Text>
              <Stack direction="row">
                {order.order_status == "RECIEVED" ||
                order.order_status == "CANCELLED" ? (
                  <Badge variant="solid" mt=".5" colorScheme="red">
                    {order.order_status}
                  </Badge>
                ) : (
                  <Badge variant="solid" mt=".5" colorScheme="green">
                    {order.order_status}
                  </Badge>
                )}
                {order.payment_mode === "COD" ? (
                  <Badge variant="solid" mt=".5" colorScheme="blue">
                    COD
                  </Badge>
                ) : order.payment_status === true ? (
                  <Badge variant="solid" mt=".5" colorScheme="green">
                    PAID
                  </Badge>
                ) : (
                  <Badge variant="solid" mt=".5" colorScheme="red">
                    UNPAID
                  </Badge>
                )}
              </Stack>
            </Stack>
            <Badge
              variant="outline"
              colorScheme="yellow"
              alignSelf="left"
              fontSize="15px"
              mb="5px"
              width="fit-content"
            >
              {order.customer_phone}
            </Badge>

            <Stack
              direction="row"
              justify="space-between"
              align="center"
              width="100%"
            >
              <Stack direction="row">
                {order.order_products.map((product) => (
                  <Badge variant="outline" colorScheme="green" key={product.id}>
                    {product.product_barcode}
                  </Badge>
                ))}
              </Stack>
              <Stack direction="row">
                {order.order_products.map((product) => (
                  <Badge variant="outline" colorScheme="green" key={product.id}>
                    {product.product_size}
                  </Badge>
                ))}
              </Stack>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Header title="Order List" isBack="false" />
      <div className={styles.container}>
        <Stack direction="row" mt="20px" width="90%">
          <Input
            placeholder="Type ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button
            onClick={() => searchId && history.push(`/orderedit/${searchId}`)}
          >
            Go
          </Button>
        </Stack>

        <InputGroup size="lg" p="2" mt="3">
          <Input
            pr="4.5rem"
            placeholder="Search Orders"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <SearchIcon mt="5" />
          </InputRightElement>
        </InputGroup>
        <SimpleGrid
          width="100%"
          align="center"
          columns={{ sm: 1, md: 2, lg: 3 }}
        >
          {searchValue.length < 1
            ? ordersFetched?.map((order) => (
                <OrderCard order={order} key={order.id} />
              ))
            : searchedOrders?.map((order) => (
                <OrderCard order={order} key={order.id} />
              ))}
        </SimpleGrid>
        <Button
          isLoading={isLoading}
          onClick={() => setPageNo((old) => old + 12)}
          mt="20px"
          mb="20px"
        >
          Load More
        </Button>
        <IconButton
          size="lg"
          p="10px"
          backgroundColor="teal"
          h={70}
          w={70}
          borderRadius={100}
          right="0"
          margin="30px"
          padding="5px"
          position="fixed"
          bottom="0"
          icon={<AddIcon color="white" w={7} h={7} />}
          onClick={() => history.push("/addorder")}
        />
      </div>
    </Box>
  );
};

export default OrderList;

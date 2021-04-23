import { React, useRef, useState, useEffect } from "react";
import styles from "./css/addOrder.module.scss";
import supabase from "../supabase";

import { useHistory } from "react-router-dom";
import backIcon from "../assets/backIcon.png";
import { Box, Flex, Stack } from "@chakra-ui/layout";
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

  const [searchValue, setSearchValue] = useState("");

  // const searchValue = useStore((state) => state.search_value);
  // const setSearchValue = useStore((state) => state.setSearchValue);

  // const searchedOrders = useStore((state) => state.orders_searched);
  // const setSearchedOrders = useStore((state) => state.setSearchedOrders);

  // const ordersFetched = useStore((state) => state.orders);
  // const setOrdersFetched = useStore((state) => state.setOrders);

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
    console.log(error);
    console.log(data);
    setSearchedOrders(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let { data: orders, error } = await supabase
        .from("orders")
        .select(`*,order_products (*)`)
        .range(pageNo - 12, pageNo)
        .order("id", { ascending: false });
      console.log(orders[0]);
      setOrdersFetched((old) => [...old, ...orders]);
      setIsLoading(false);
    };
    fetchData();
  }, [pageNo]);

  //fetch data on page load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let { data: orders, error } = await supabase
        .from("orders")
        .select(`*,order_products (*)`)
        .range(pageNo - 12, pageNo)
        .order("id", { ascending: false });
      console.log(orders[0]);
      setOrdersFetched((old) => [...orders]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setPageNo((old) => old + 12);
  };

  const OrderCard = ({ order }) => {
    return (
      <Box
        w="95%"
        margin="5px"
        borderWidth="1px"
        borderRadius="lg"
        onClick={() => history.push(`/orderedit/${order.id}`)}
      >
        <Flex height="auto" p="5px">
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
          <Flex flexDirection="column" ml="3" mt="1">
            <Stack direction="row">
              <Badge
                fontSize={15}
                variant="outline"
                alignSelf="start"
                colorScheme="gray"
                color="black"
              >
                Order id: {order.id}
              </Badge>
            </Stack>
            <Text fontSize="lg" fontWeight="medium">
              {order.customer_name}
            </Text>
            <Badge
              variant="outline"
              colorScheme="yellow"
              alignSelf="left"
              fontSize="15px"
              mb="5px"
              alignSelf="start"
            >
              {order.customer_phone}
            </Badge>
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
            <Text mt="1" fontWeight="bold">
              ₹
              {order.order_products.reduce(
                (acc, curr) => acc + curr.product_price,
                0
              )}
            </Text>
            <Stack direction="row">
              {order.order_products.map((product) => (
                <Badge variant="outline" colorScheme="green" key={product.id}>
                  {product.product_barcode}
                </Badge>
              ))}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      <Header title="Order List" isBack="false" />
      <div className={styles.container}>
        <InputGroup size="lg" p="2" mt="5">
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

        {searchValue.length < 1
          ? ordersFetched.map((order) => (
              <OrderCard order={order} key={order.id} />
            ))
          : searchedOrders.map((order) => (
              <OrderCard order={order} key={order.id} />
            ))}
        {isLoading && <CircularProgress isIndeterminate p="20px" />}
        <Button onClick={handleLoadMore} mt="20px" mb="20px">
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
    </>
  );
};

export default OrderList;

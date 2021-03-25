import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import styles from "../pages/css/addOrder.module.scss";

const OrderReciept = ({ orderDetails }) => {
  return (
    <Box
      borderRadius="10px"
      backgroundColor="white"
      p="15px"
      width="350px"
      id="order_reciept"
    >
      <Heading color="#29283C" fontSize="18px" fontWeight="600" mt="10px">
        Order Reciept
      </Heading>
      <Text color="gray.500">Your order is confirmed</Text>

      <hr
        style={{
          marginTop: "10px",
          height: "1.5px",
          borderWidth: 0,
          color: "#d9d9d9",
          backgroundColor: "#d9d9d9",
        }}
      />

      <Text mt="10px">
        date : <b>{orderDetails.order_date}</b>
      </Text>
      <Text mt="10px">
        Order Id : <b>{orderDetails.id}</b>
      </Text>

      <Text>
        Customer Name : <b>{orderDetails.customer_name}</b>
      </Text>
      <Text>
        Mobile : <b>{orderDetails.customer_phone}</b>
      </Text>

      <Stack direction="row">
        <Text>Address : {orderDetails.customer_address}</Text>
      </Stack>

      {orderDetails.order_products &&
        orderDetails.order_products.map((product) => (
          <Box
            mt="20px"
            borderRadius="10px"
            borderWidth="1px"
            p="10px"
            mb="8px"
            key={product.id}
          >
            <Stack direction="row">
              <img
                className={styles.product_image}
                src={`https://firebasestorage.googleapis.com/v0/b/abony-cd5c4.appspot.com/o/${product.product_image}?alt=media`}
                borderRadius="10px"
              />
              <Stack direction="column" spacing="0px">
                <Stack spacing="5" direction="row" mt="2">
                  <Text color="#757575" fontWeight="500">
                    Barcode :
                  </Text>
                  <Text colorScheme="black">{product.product_barcode}</Text>
                </Stack>
                <Stack spacing="5" direction="row" mt="2">
                  <Text color="#757575" fontWeight="500">
                    Price :
                  </Text>
                  <Text colorScheme="black">₹{product.product_price}</Text>
                </Stack>
                <Stack spacing="5" direction="row" mt="2">
                  <Text color="#757575" fontWeight="500">
                    Size :
                  </Text>
                  <Text colorScheme="black">{product.product_size}</Text>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        ))}
      <hr
        style={{
          height: "1.5px",
          marginTop: "10px",
          borderWidth: 0,
          color: "#d9d9d9",
          backgroundColor: "#d9d9d9",
        }}
      />
      <Text textAlign="right" mr="15px" mt="10px">
        Courier Charge :{" "}
        <b>
          {orderDetails.shipping_charge == 0
            ? "FREE SHIPPING"
            : orderDetails.shipping_charge}
        </b>
      </Text>
      <Text textAlign="right" mr="15px">
        Cart Value :{" "}
        <b>
          ₹
          {orderDetails.order_products &&
            orderDetails.order_products.reduce(
              (acc, curr) => acc + curr.product_price,
              0
            )}
        </b>
      </Text>

      <Text textAlign="right" mr="15px" mt="20px" mb="10px">
        Total :{" "}
        <b>
          ₹
          {orderDetails.order_products &&
            orderDetails.order_products.reduce(
              (acc, curr) => acc + curr.product_price,
              +orderDetails.shipping_charge
            )}
        </b>
      </Text>
      <Text textAlign="center" mt="40px" mb="20px" fontWeight="400">
        🎉 Thanks for shopping with abony
      </Text>
    </Box>
  );
};

export default OrderReciept;

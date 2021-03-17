import { React, useRef, useState, useEffect } from "react";
import styles from "./css/addOrder.module.scss";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import { useFormLocal } from "../components/useFormLocal";
import supabase from "../supabase";
import "react-datepicker/dist/react-datepicker.css";
import {
  CloseIcon,
  AddIcon,
  EditIcon,
  LinkIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
  Img,
} from "@chakra-ui/react";
import {
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
  Switch,
  FormErrorMessage,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Header from "../components/Header";

//product.product_image is treated as id for product
const OrderEdit = (props) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [editContent, setEditContent] = useState();
  const cancelRef = useRef();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const productId = props.match.params.id;

  const btnRef = useRef();

  //get details of order
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`*,order_products (*)`)
        .eq("id", productId);
      console.log(error);
      console.log(data);
      setOrderDetails(data[0]);
    };
    fetchData();
  }, []);

  //drawer
  const DrawerCard = () => {
    return (
      <>
        <Modal
          blockScrollOnMount={false}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{editContent && editContent}</ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Header title="Order Edit" />
      <div className={styles.container_orderedit}>
        <DrawerCard />

        <Box borderRadius="10px" backgroundColor="white" p="10px" margin="5px">
          <Heading color="#29283C" fontSize="18px" fontWeight="600">
            Order Details
          </Heading>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Date :
            </Text>
            <Text colorScheme="black">
              {new Date(orderDetails.order_date).toLocaleString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Status :
            </Text>

            <Badge
              variant="solid"
              colorScheme={
                orderDetails.order_status == "RECIEVED"
                  ? "gray"
                  : orderDetails.order_status == "RETURNED"
                  ? "red"
                  : "green"
              }
              alignSelf="center"
              size="sm"
              fontSize="15px"
            >
              {orderDetails.order_status}
            </Badge>

            <IconButton
              icon={<EditIcon />}
              size="sm"
              onClick={() => {
                setModalTitle("Order Status");
                setEditContent(
                  <>
                    <Select
                      value={orderDetails.order_status}
                      onChange={(e) => {
                        setOrderDetails((old) => ({
                          ...old,
                          order_status: e.target.value,
                        }));
                        onClose();
                      }}
                      mb="20px"
                    >
                      <option value="RECIEVED">RECIEVED</option>
                      <option value="PACKED">PACKED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="RETURNED">RETURNED</option>
                    </Select>
                  </>
                );
                onOpen();
              }}
            />
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Total Amount :
            </Text>
            <Text colorScheme="black">
              ₹
              {orderDetails.order_products &&
                orderDetails.order_products.reduce(
                  (acc, curr) => acc + curr.product_price,
                  0
                )}
            </Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Payment Mode :
            </Text>
            <Text colorScheme="black">{orderDetails.payment_mode}</Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Payment Status :
            </Text>
            <Badge
              variant="solid"
              colorScheme={orderDetails.payment_status ? "green" : "red"}
              alignSelf="center"
            >
              {orderDetails.payment_status ? "PAID" : "UNPAID"}
            </Badge>
            <IconButton
              icon={<EditIcon />}
              size="sm"
              onClick={() => {
                setModalTitle("Payment Status");
                setEditContent(
                  <>
                    <Switch
                      size="lg"
                      isChecked={orderDetails.payment_status}
                      onChange={(e) => {
                        setOrderDetails((old) => ({
                          ...old,
                          payment_status: !orderDetails.payment_status,
                        }));
                        onClose();
                      }}
                      mb="20px"
                    />
                  </>
                );
                onOpen();
              }}
            />
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Remarks :
            </Text>
            <Text colorScheme="black">{orderDetails.order_remark}</Text>
          </Stack>
        </Box>
        <Box borderRadius="10px" backgroundColor="white" p="10px" margin="5px">
          <Heading color="#29283C" fontSize="18px" fontWeight="600">
            Customer Details
          </Heading>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Name :
            </Text>
            <Text colorScheme="black">{orderDetails.customer_name}</Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Mobile :
            </Text>
            <Text colorScheme="black">{orderDetails.customer_phone}</Text>
            <IconButton
              icon={<ExternalLinkIcon />}
              size="sm"
              onClick={() => window.open(`tel:${orderDetails.customer_phone}`)}
            />
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Instagram :
            </Text>
            <Text colorScheme="black">{orderDetails.customer_instagram}</Text>
            <IconButton
              icon={<ExternalLinkIcon />}
              size="sm"
              onClick={() =>
                window.open(
                  `https://instagram.com/${orderDetails.customer_instagram}`
                )
              }
            />
          </Stack>
          <Stack spacing="5" direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Address :
            </Text>
            <Text colorScheme="black">{orderDetails.customer_address}</Text>
          </Stack>
        </Box>

        <Box borderRadius="10px" backgroundColor="white" p="10px" margin="5px">
          <Heading color="#29283C" fontSize="18px" fontWeight="600" mb="10px">
            Order Products
          </Heading>
          {orderDetails.order_products &&
            orderDetails.order_products.map((product) => (
              <Box borderRadius="5px" borderWidth="2px" p="10px" mb="8px">
                <Stack direction="row">
                  <Img
                    w="100px"
                    src="https://picsum.photos/200"
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
                      <Text colorScheme="black">{product.product_price}</Text>
                    </Stack>
                    <Stack spacing="5" direction="row" mt="2">
                      <Text color="#757575" fontWeight="500">
                        Size :
                      </Text>
                      <Text colorScheme="black">{product.product_size}</Text>
                    </Stack>
                    <Stack spacing="5" direction="row" mt="2">
                      <Text color="#757575" fontWeight="500">
                        From :
                      </Text>
                      <Text colorScheme="black">{product.product_from}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            ))}
        </Box>

        <Box borderRadius="10px" backgroundColor="white" p="10px" margin="5px">
          <Heading color="#29283C" fontSize="18px" fontWeight="600">
            Courier Details
          </Heading>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Partner :
            </Text>
            <Text colorScheme="black">{orderDetails.shipping_partner}</Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              AWB No :
            </Text>
            <Text colorScheme="black">{orderDetails.shipping_awb}</Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Charge :
            </Text>
            <Text colorScheme="black">{orderDetails.shipping_charge}</Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Shipping Date :
            </Text>
            <Text colorScheme="black">{orderDetails.shipping_date}</Text>
          </Stack>
          <Stack direction="row" mt="2">
            <Text color="#757575" fontWeight="500">
              Shipping Delivered Date :
            </Text>
            <Text colorScheme="black">
              {orderDetails.shipping_delivered_date}
            </Text>
          </Stack>
        </Box>

        <Button
          colorScheme="teal"
          variant="solid"
          size="xs"
          w="100%"
          padding="6"
          mt="6"
          mb="6"
          isLoading={isLoading}
          loadingText="Uploading"
        >
          Update order
        </Button>
        <AlertDialog
          isOpen={isOpenAlert}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsOpenAlert(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent w="90%" pos="center">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Add Order
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to add this order ?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsOpenAlert(false)}>
                  Cancel
                </Button>
                <Button colorScheme="green" ml={3}>
                  Add
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </>
  );
};

export default OrderEdit;

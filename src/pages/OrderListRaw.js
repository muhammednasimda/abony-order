// import { Box } from "@chakra-ui/layout";
// import { React, useRef, useState, useEffect } from "react";
// import supabase from "../supabase";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";

// const OrderListRaw = () => {
//   const [ordersFetched, setOrdersFetched] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       let { data: orders, error } = await supabase
//         .from("orders")
//         .select(`*,order_products (*)`)
//         .order("id", { ascending: true });
//       console.log(orders[0]);
//       setOrdersFetched(orders);
//     };
//     fetchData();
//   }, []);

//   return (
//     <Box>
//       <ReactHTMLTableToExcel
//         id="test-table-xls-button"
//         className="download-table-xls-button"
//         table="table-to-xls"
//         filename="tablexls"
//         sheet="tablexls"
//         buttonText="Download as XLS"
//       />
//       <table id="table-to-xls">
//         <tr>
//           <th>Date</th>
//           <th>Id</th>
//           <th>Name</th>
//           <th>Products</th>
//           <th>Total</th>
//           <th>Address</th>
//           <th>Pincode</th>
//           <th>Is Reseller</th>
//           <th>Phone</th>
//           <th>Payment</th>
//           <th>payment Status</th>
//           <th>Shipping charge</th>
//           <th>Shipping Status</th>
//           <th>AWB</th>
//           <th>Shipping Partner</th>
//           <th>Remark</th>
//         </tr>

//         {ordersFetched?.map((order) => (
//           <tr>
//             <td>{order.order_date}</td>
//             <td>{order.id}</td>
//             <td>{order.customer_name}</td>
//             <td>
//               {order?.order_products?.map((product) => (
//                 <>
//                   <span>{product.product_barcode}</span>&nbsp;&nbsp;
//                   <span>{product.product_type}</span>&nbsp;&nbsp;
//                   <span>{product.product_price}</span>&nbsp;&nbsp;
//                   <span>{product.product_size}</span>&nbsp;&nbsp;
//                   <br />
//                 </>
//               ))}
//             </td>
//             <td>
//               {order.order_products.reduce(
//                 (acc, curr) => acc + curr.product_price,
//                 0
//               )}
//             </td>
//             <td>{order.customer_address}</td>
//             <td>{order.customer_pincode}</td>
//             <td>{order.is_reseller ? "yes" : "no"}</td>
//             <td>{order.customer_phone}</td>
//             <td>{order.payment_mode}</td>
//             <td>{order.payment_status ? "paid" : "due"}</td>
//             <td>{order.shipping_charge}</td>
//             <td>{order.order_status}</td>
//             <td>{order.shipping_awb}</td>
//             <td>{order.shipping_partner}</td>
//             <td>{order.order_remark}</td>
//           </tr>
//         ))}
//       </table>
//     </Box>
//   );
// };

// export default OrderListRaw;

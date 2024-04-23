import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { Button, Container, Divider, Group, Image, Paper, Stack, Table, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      // toast.error(err);
              notifications.show({
          color: "red",
          icon: <IconX />,
          limit: "1",
          title: "Bummer!!!",
          message: error?.data?.message || error.error,
        })
    }
  };

  return (
    // <>
    //   <CheckoutSteps step1 step2 step3 step4 />
    //   <Row>
    //     <Col md={8}>
    //       <ListGroup variant='flush'>
    //         <ListGroup.Item>
    //           <h2>Shipping</h2>
    //           <p>
    //             <strong>Address:</strong>
    //             {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
    //             {cart.shippingAddress.postalCode},{' '}
    //             {cart.shippingAddress.country}
    //           </p>
    //         </ListGroup.Item>

    //         <ListGroup.Item>
    //           <h2>Payment Method</h2>
    //           <strong>Method: </strong>
    //           {cart.paymentMethod}
    //         </ListGroup.Item>

    //         <ListGroup.Item>
    //           <h2>Order Items</h2>
    //           {cart.cartItems.length === 0 ? (
    //             <Message>Your cart is empty</Message>
    //           ) : (
    //             <ListGroup variant='flush'>
    //               {cart.cartItems.map((item, index) => (
    //                 <ListGroup.Item key={index}>
    //                   <Row>
    //                     <Col md={1}>
    //                       <Image
    //                         src={item.image}
    //                         alt={item.name}
    //                         fluid
    //                         rounded
    //                       />
    //                     </Col>
    //                     <Col>
    //                       <Link to={`/product/${item.product}`}>
    //                         {item.name}
    //                       </Link>
    //                     </Col>
    //                     <Col md={4}>
    //                       {item.qty} x ${item.price} = $
    //                       {(item.qty * (item.price * 100)) / 100}
    //                     </Col>
    //                   </Row>
    //                 </ListGroup.Item>
    //               ))}
    //             </ListGroup>
    //           )}
    //         </ListGroup.Item>
    //       </ListGroup>
    //     </Col>
    //     <Col md={4}>
    //       <Card>
    //         <ListGroup variant='flush'>
    //           <ListGroup.Item>
    //             <h2>Order Summary</h2>
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             <Row>
    //               <Col>Items</Col>
    //               <Col>${cart.itemsPrice}</Col>
    //             </Row>
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             <Row>
    //               <Col>Shipping</Col>
    //               <Col>${cart.shippingPrice}</Col>
    //             </Row>
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             <Row>
    //               <Col>Tax</Col>
    //               <Col>${cart.taxPrice}</Col>
    //             </Row>
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             <Row>
    //               <Col>Total</Col>
    //               <Col>${cart.totalPrice}</Col>
    //             </Row>
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             {error && (
    //               <Message variant='danger'>{error.data.message}</Message>
    //             )}
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             <Button
    //               type='button'
    //               className='btn-block'
    //               disabled={cart.cartItems === 0}
    //               onClick={placeOrderHandler}
    //             >
    //               Place Order
    //             </Button>
    //             {isLoading && <Loader />}
    //           </ListGroup.Item>
    //         </ListGroup>
    //       </Card>
    //     </Col>
    //   </Row>
    // </>
    <Container size="lg">
      <CheckoutSteps step1 step2 step3 step4 active4 />
      <div className="flex md:flex-row flex-col gap-4 mt-6">
        <Stack className=" md:w-4/6  w-full">
          <Title mb="lg">Place Order </Title>
          <div>
            <Title order={6}>Shipping Address</Title>
            <Text>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Text>
          </div>
          <Divider color="gray" my="xs" />
          <div>
            <Title order={6}>Payment Method</Title>
            <Text>{cart.paymentMethod}</Text>
          </div>
          <Divider color="gray" my="sm" />
          <div>
            <Title order={6}>Order Items</Title>

            {cart.cartItems.length === 0 ? (
              <Paper shadow="xl">Your cart is empty</Paper>
            ) : (
              <Group>
                <Table>
                  <Table.Tbody>
                    {cart.cartItems.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <Image src={item.image} w={80} />
                          <Link
                            to={`/product/${item.product}`}
                            className="text-blue-500 hover:underline cursor-pointer"
                          >
                            <Text>{item.name}</Text>
                          </Link>
                          <Text>
                            {item.qty} x ${item.price} = ${(item.qty * (item.price * 100)) / 100}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Group>
            )}
          </div>
        </Stack>
        <Stack className=" md:w-2/6 w-full border rounded-md p-4 shadow-xl h-fit">
          <Table>
            <Table.Thead>
              <Title mb="lg" order={3}>
                Order Summary{" "}
              </Title>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Items:</Table.Td>
                <Table.Td>{cart.itemsPrice} ETB</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Shipping:</Table.Td>
                <Table.Td> {cart.shippingPrice} ETB</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Tax:</Table.Td>
                <Table.Td>{cart.taxPrice} ETB</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Total:</Table.Td>
                <Table.Td className="font-bold">{cart.totalPrice} ETB</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Button disabled={cart.cartItems === 0} type="button" loading={isLoading} onClick={placeOrderHandler}>
            Place Order
          </Button>
        </Stack>
      </div>
    </Container>
  );
};

export default PlaceOrderScreen;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import {
  Button,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconTrash, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const handleCoupon = (e) => {
    e.preventDefault();
    notifications.show({
      color: "red",
      icon: <IconX />,
      limit: "1",
      title: "Bummer!!!",
      message: "Invalid Coupon Code ",
    });
  };

  return (
    <Container fluid mx="xl">
      <Title order={1} className="font-Kanit font-semibold">
        Shopping Cart
      </Title>
      {cartItems.length === 0 ? (
        <Paper shadow="md">
          <Title order={4} className="font-Kanit font-normal">
            Your Cart Is Empty{" "}
            <Link to="/product" className="text-blue-400 underline italic">
              Go Back
            </Link>{" "}
          </Title>
        </Paper>
      ) : (
        <Stack align="stretch" justify="space-between" gap="md">
          <ScrollArea>
            <Table striped withRowBorders={false} mt="xl" highlightOnHover miw={800}>
              <Table.Thead mb="lg">
                <Table.Tr>
                  <Table.Th>Products</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Qty</Table.Th>
                  <Table.Th>Subtotal</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {cartItems.map((item) => (
                  <Table.Tr key={item._id} mb="xl">
                    <Table.Td className="flex items-center  gap-4">
                      <Image src={item.image} alt={item.name} rounded w={80} />
                      {item.name}
                    </Table.Td>
                    <Table.Td>{item.price} ETB</Table.Td>
                    <Table.Td>{item.qty}</Table.Td>
                    <Table.Td>{item.qty * item.price} ETB</Table.Td>
                    <Table.Td className="flex items-center justify-start">
                      <ThemeIcon
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                        radius="xl"
                        size="lg"
                        className="cursor-pointer"
                      >
                        <IconTrash stroke={1} />
                      </ThemeIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
          <Group mt="lg" position="apart" justify="space-between" align="flex-start">
            <Stack>
              <Title order={1} className="font-Kanit font-semibold">
                Apply Coupon
              </Title>
              <form onSubmit={handleCoupon} className="flex items-center justify-between gap-6">
                <TextInput
                  placeholder="Coupon Code"
                  size="md"
                  className="border-2 border-gray-700 rounded-md "
                  w={300}
                />
                <Button variant="filled" size="md" w={250} type="submit">
                  Apply Coupon
                </Button>
              </form>
            </Stack>
            <Stack className="bg-NavColor p-6 rounded-xl w-2/6">
              <Title order={1} className="font-Kanit font-semibold">
                Cart Total
              </Title>
              <Group className="w-full mb-2 " justify="space-between">
                <Title order={5} className="font-Courier">
                  Subtotal:
                </Title>
                <Text order={5}>
                  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} ETB
                </Text>
              </Group>
              <Divider color="gray" />
              <Group className="w-full mb-2 " justify="space-between">
                <Title order={5} className="font-Courier">
                  Shipping:
                </Title>
                <Text order={5}>Free</Text>
              </Group>
              <Divider color="gray" />

              <Group className="w-full mb-2 " justify="space-between">
                <Title order={5} className="font-Courier">
                  Total:
                </Title>
                <Text order={5}>
                  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} ETB
                </Text>
              </Group>
              <Divider color="gray" />

              <Button variant="filled" fullWidth size="md" onClick={checkoutHandler} type="submit">
                Proceed to Checkout
              </Button>
            </Stack>
          </Group>
        </Stack>
      )}
    </Container>
  );
};

export default CartScreen;

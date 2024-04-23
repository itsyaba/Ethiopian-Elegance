import { Button, Container, Paper, Table, Title } from '@mantine/core';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { Link } from 'react-router-dom';
import { IconTimeDuration60 } from '@tabler/icons-react';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <Container>
      <Title>Orders</Title>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Paper shadow="xl">{error?.data?.message || error.error}</Paper>
      ) : (
        <Table withColumnBorders withRowBorders withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>USER</Table.Th>
              <Table.Th>DATE</Table.Th>
              <Table.Th>TOTAL</Table.Th>
              <Table.Th>PAID</Table.Th>
              <Table.Th>DELIVERED</Table.Th>
              <Table.Th> </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders.map((order) => (
              <Table.Tr key={order._id}>
                <Table.Td>{order._id}</Table.Td>
                <Table.Td>{order.user && order.user.name}</Table.Td>
                <Table.Td>{order.createdAt.substring(0, 10)}</Table.Td>
                <Table.Td>${order.totalPrice}</Table.Td>
                <Table.Td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <IconTimeDuration60 style={{ color: "red" }} />
                  )}
                </Table.Td>
                <Table.Td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <IconTimeDuration60 style={{ color: "red" }} />
                  )}
                </Table.Td>
                <Table.Td>
                  <Link to={`/order/${order._id}`}>
                    <Button  className="btn-sm">
                      Details
                    </Button>
                  </Link>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderListScreen;

import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import {
  Button,
  Container,
  ScrollArea,
  Table,
  ThemeIcon,
  Title,
  Group,
  Paper,
} from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

const ProductListScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation(userInfo._id);

 
 
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container size="xl">
      <Group justify="space-between" align="center" mb="xl">
        <Title>Products</Title>
        <Button leftSection={<IconPlus />} onClick={createProductHandler}>
          Create New Product
        </Button>
      </Group>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Paper>{error.data.message}</Paper>
      ) : (
        <ScrollArea>
          <Table withColumnBorders withTableBorder withRowBorders highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>NAME</Table.Th>
                <Table.Th>PRICE</Table.Th>
                <Table.Th>CATEGORY</Table.Th>
                <Table.Th>BRAND</Table.Th>
                <Table.Th> </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.products.map((product) => (
                <Table.Tr key={product._id}>
                  <Table.Td>{product._id}</Table.Td>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.price} ETB</Table.Td>
                  <Table.Td>{product.category}</Table.Td>
                  <Table.Td>{product.brand}</Table.Td>
                  <Table.Td className="flex items-center justify-center gap-4 md:flex-row flex-col">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <ThemeIcon>
                        <IconEdit size={16} />
                      </ThemeIcon>
                    </Link>
                    <ThemeIcon
                      onClick={() => deleteHandler(product._id)}
                      color="red"
                      className="cursor-pointer"
                    >
                      <IconTrash size={16} />
                    </ThemeIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </ScrollArea>
      )}
    </Container>
  );
};

export default ProductListScreen;

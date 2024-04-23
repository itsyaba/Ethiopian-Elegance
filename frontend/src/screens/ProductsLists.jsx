import { Container, SimpleGrid } from "@mantine/core";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useParams , useNavigate } from "react-router-dom";
import Product from "../components/product";
import LoaderComponent from "../components/Loader";
import Paginate from "../components/Paginate";

const ProductsLists = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();


  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });



  return (
    <Container size="lg">
      {isLoading ? (
        <LoaderComponent />
      ) : error ? (
        navigate("/")
      ) : (
        <>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4, md: 3 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </SimpleGrid>
          <Paginate pages={data.pages} page={data.page} />
          
        </>
      )}
    </Container>
  );
};

export default ProductsLists;

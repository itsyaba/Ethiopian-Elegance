import { useParams, Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

import Product from "../components/product";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import HeroText from "../components/HeroText";
import { notifications } from "@mantine/notifications";
import { IconArrowBack, IconX } from "@tabler/icons-react";
import { Button, Container, Flex, SimpleGrid } from "@mantine/core";

const HomeScreen = () => {
  const { keyword } = useParams();

  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return (
    <>
      {!keyword ? (
        <HeroText />
      ) : (
        <Link to="/">
          <Button leftSection={<IconArrowBack />} ml="xl" mb="lg">
            Go Back
          </Button>
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        notifications.show({
          color: "red",
          icon: <IconX />,
          limit: "1",
          title: "Bummer!!!",
          message: error?.data?.message || error.error,
        })
      ) : (
        <Container fluid className="mx-10">
          <Meta />
          {!keyword && (
            <Flex justify="space-between" align="center" direction="row" mb="xl">
              <h1 className="text-3xl font-semibold  font-Kanit">Top Products</h1>
              <Link to="/product">
                <Button size="md">View All</Button>
              </Link>
            </Flex>
          )}
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4, md: 3 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;

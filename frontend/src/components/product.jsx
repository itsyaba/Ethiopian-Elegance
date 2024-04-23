/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, Image, Text, Group } from "@mantine/core";
import classes from "./css/FeaturesCard.module.css";
import RatingComponent from "./Rating";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

export default function Products({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate("/cart");
  };

  return (
    <Link to={`/product/${product._id}`}>
      <Card withBorder radius="md" className={classes.card} shadow="sm" padding="lg">
        <Card.Section className={classes.imageSection}>
          <Image src={product.image} alt={product.name} className={classes.image} />
          <Link to="/cart" className={classes.add}>
            <Group justify="center" onClick={addToCartHandler}>
              <Text size="md" className="font-Kanit">
                Add To Cart
              </Text>
            </Group>
          </Link>
        </Card.Section>

        <Card.Section mt="md">
          <Text className="font-Kanit ml-3">{product.name}</Text>
        </Card.Section>

        <Card.Section className="flex items-center justify-start gap-2" mb="md">
          <Text fw={500} className="ml-3">
            {product.price} ETB
          </Text>
          <Group className="">
            <RatingComponent value={product.rating} />
            <Text>({product.numReviews})</Text>
          </Group>
        </Card.Section>
      </Card>
    </Link>
  );
}

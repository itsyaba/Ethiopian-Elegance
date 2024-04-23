import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice";

import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addToCart } from "../slices/cartSlice";

import { notifications } from "@mantine/notifications";
import {
  Button,
  Container,
  Image,
  ThemeIcon,
  Text,
  Flex,
  Paper,
  Title,
  Group,
  List,
  Textarea,
} from "@mantine/core";
import { IconArrowBack, IconArrowRight, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import RatingComponent from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      notifications.show({
        color: "blue",
        icon: <IconArrowRight />,
        limit: "1",
        title: "Bummer!!!",
        message: "Review Created Successfully ",
      });
    } catch (err) {
      notifications.show({
        color: "red",
        icon: <IconX />,
        limit: "1",
        title: "Bummer!!!",
        message: error?.data?.message || error.error,
      });
    }
  };

  const incrementHandler = () => {
    if (qty !== product.countInStock) {
      setQty(qty + 1);
    } else {
      notifications.show({
        color: "red",
        icon: <IconX />,
        limit: "1",
        title: "Bummer!!!",
        message: "We Do Not Have More Than This",
      });
    }
  };

  const decrementHandler = () => {
    if (qty !== 1) {
      setQty(qty - 1);
    }
  };


  return (
    <>
      <Link className="my-3" to="/">
        <Button leftSection={<IconArrowBack />} ml="xl">
          Go Back
        </Button>
      </Link>
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
        <>
          <Meta title={product.name} description={product.description} />

          <Container
            size="xl"
            className="m-auto mt-10 grid grid-cols-1 md:grid-cols-2  place-items-center md:place-items-start "
          >
            <div className="w-full md:flex flex-col items-center justify-center h-full hidden ">
              <div className="w-6/12 md:w-5/6 ">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="rounded-md "
                />
              </div>
            </div>

            <div className="lg:pl-28 pt-10  w-full">
              <div>
                <p className="text-Orange font-bold tracking-widest">{product.brand}</p>
                <h1 className="text-5xl font-bold py-10">{product.name}</h1>
              </div>
              <p className="text-DarkGrayishBlue  pb-8">{product.description}</p>
              <div className="mb-4">
                <h2 className="font-bold text-3xl ">{product.price} ETB</h2>
                <Flex align="center" justify="flex-start" className="mt-4">
                  <RatingComponent value={product.rating} />
                  <Text>({product.numReviews})</Text>
                </Flex>
              </div>
              <div className="flex items-center gap-1 mt-8 flex-col lg:flex-row  lg:gap-12 justify-center">
                <div className=" flex items-center gap-5 w-1/4 bg-GrayishBlue p-2">
                  <ThemeIcon onClick={decrementHandler}>
                    <IconMinus width={50} className="cursor-pointer w-1/3 h-full" />
                  </ThemeIcon>
                  <p className="font-bold">{qty}</p>
                  <ThemeIcon onClick={incrementHandler}>
                    <IconPlus width={50} className="cursor-pointer" />
                  </ThemeIcon>
                </div>
                <Button
                  className=" bg-Orange w-full hover:bg-Orange hover:opacity-90 "
                  size="lg"
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock === 0 ? "Out Of Stock" : "Add to cart"}
                </Button>
              </div>
            </div>
          </Container>
          <Container
            mt="xl"
            size="xl"
            className="m-auto mt-10 grid grid-cols-1 md:grid-cols-2  place-items-center md:place-items-start w-full"
          >
            <Group className="w-ful p-4 bg-gray-100 rounded-md">
              <Title order={1} className="font-Kanit font-light">
                Reviews
              </Title>
              {product.reviews.length === 0 && (
                <Paper shadow="xl" p="lg" className="bg-NavColor w-full ">
                  <Text className="font-bold font-Courier">No Review Found</Text>
                </Paper>
              )}
              <List className="w-full">
                {product.reviews.map((review) => (
                  <List.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <RatingComponent value={review.rating} />
                    <Text>{review.createdAt.substring(0, 10)}</Text>
                    <Text>{review.comment}</Text>
                  </List.Item>
                ))}

                <List.Item className="w-full ">
                  <Title order={2} className="font-Kanit font-light mb-5">
                    Write A Customer Review
                  </Title>
                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <form action="POST" onSubmit={submitHandler}>
                      <div className="flex justify-start flex-col mb-4 gap-2">
                        <Title order={4} className="font-Kanit font-light  ">
                          Rating
                        </Title>
                        <div>
                        <RatingComponent
                          value={rating}
                          onChange={(value) => setRating(value)}
                          readOnly={false}
                          size="xl"
                        />
                        </div>

                      </div>
                      <Textarea
                        label="Comment"
                        resize="both"
                        placeholder="Your Comment"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                      type="submit"
                      disabled={loadingProductReview}
                      mt="md"
                      size="md"
                      >Submit</Button>
                    </form>
                  ) : (
                    <h1>Please sign in to leave a review.</h1>
                  )}
                </List.Item>
              </List>
            </Group>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductScreen;

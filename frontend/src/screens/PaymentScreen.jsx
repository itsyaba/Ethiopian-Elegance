import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
import { Button, Container, Radio, Title } from "@mantine/core";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 active3 />
      <Title mb="lg">Payment Method </Title>
      <form onSubmit={submitHandler}>
        <Title order={4} className="font-normal font-Kanit" mb="lg">
          Select Method{" "}
        </Title>
        <Radio
          label="Paypal Or Credit Card"
          required
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Button type="submit" mt="lg">
          Continue
        </Button>
      </form>
    </Container>
  );
};

export default PaymentScreen;

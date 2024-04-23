import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../slices/cartSlice";
import { Button, Container, NumberInput, TextInput, Title } from "@mantine/core";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <Container size="sm">
      <CheckoutSteps step1 step2 active2  />
      <Title mb="lg">Shipping </Title>
      <form method="post" onSubmit={submitHandler} className="flex items-stretch justify-between flex-col gap-4">
        <TextInput label="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
        <TextInput label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
        <NumberInput label="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}  placeholder="Enter postal code"/>
        <TextInput label="Country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter country" />
        <Button type="submit" fullWidth mt="xl">Continue</Button>
      </form>
    </Container>
  );
};

export default ShippingScreen;

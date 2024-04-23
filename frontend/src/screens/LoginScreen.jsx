import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      // toast.error(err?.data?.message || err.error);
      console.log(err);
      notifications.show({
        color: "red",
        icon: <IconX />,
        limit: "1",
        title: "Bummer!!!",
        message: err?.data?.message || err.error,
      });
    }
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center">Welcome back!</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-blue-500 hover:underline"
          >
            Create account
          </Link>
        </Text>

        <Paper
          withBorder
          shadow="xl"
          p={30}
          mt={30}
          radius="md"
          component="form"
          onSubmit={submitHandler}
        >
          <TextInput
            label="Email"
            placeholder="johndoe@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default LoginScreen;

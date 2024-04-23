import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // toast.error('Passwords do not match');
              notifications.show({
                color: "red",
                icon: <IconX />,
                limit: "1",
                title: "Bummer!!!",
                message: "Password Do Not Match"
              });
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        console.log(res)
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
                notifications.show({
                  color: "red",
                  icon: <IconX />,
                  limit: "1",
                  title: "Bummer!!!",
                  message: err?.data?.message || err.error,
                });
      }
    }
  };

  return (
    // <FormContainer>
    //   <h1>Register</h1>
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group className='my-2' controlId='name'>
    //       <Form.Label>Name</Form.Label>
    //       <Form.Control
    //         type='name'
    //         placeholder='Enter name'
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='my-2' controlId='email'>
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type='email'
    //         placeholder='Enter email'
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='my-2' controlId='password'>
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Enter password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Form.Group className='my-2' controlId='confirmPassword'>
    //       <Form.Label>Confirm Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Confirm password'
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Button disabled={isLoading} type='submit' variant='primary'>
    //       Register
    //     </Button>

    //     {isLoading && <Loader />}
    //   </Form>

    //   <Row className='py-3'>
    //     <Col>
    //       Already have an account?{' '}
    //       <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
    //         Login
    //       </Link>
    //     </Col>
    //   </Row>
    // </FormContainer>
    <>
      <Container size={420} my={40}>
        <Title ta="center">Welcome to Ethiopian Elegance!</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-blue-500 hover:underline"
          >
            Login
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
            label="Name"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            placeholder="johndoe@gmail.com"
            required
            value={email}
            mt="md"
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            required
            mt="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Create Account
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterScreen;

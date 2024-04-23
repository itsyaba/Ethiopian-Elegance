import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Button, Container, PasswordInput, TextInput, Title } from "@mantine/core";

import { notifications } from "@mantine/notifications";
import { IconArrowRight, IconX } from "@tabler/icons-react";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notifications.show({
        color: "red",
        icon: <IconX />,
        limit: "1",
        title: "Bummer!!!",
        message: "Password Do Not Match",
      });
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        notifications.show({
          color: "blue",
          icon: <IconArrowRight />,
          limit: "1",
          title: "Success!!!",
          message: "Profile Updated Successfully",
        });
      } catch (err) {
        notifications.show({
          color: "red",
          icon: <IconArrowRight />,
          limit: "1",
          title: "Success!!!",
          message: err?.data?.message || err.error,
        });
      }
    }
  };

  return (
    <Container size="xs">
      <Title order={1} mb="lg">
        Edit Your Profile
      </Title>
      <form onSubmit={submitHandler}>
        <TextInput
          label="Name"
          placeholder="Enter name"
          mb="lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="lg"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="lg"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" loading={loadingUpdateProfile} mt="xl">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default ProfileScreen;

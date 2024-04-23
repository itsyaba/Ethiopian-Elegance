import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice";
import { Button, Checkbox, Container, Paper, TextInput, Title } from "@mantine/core";
import { IconArrowBack, IconFreeRights, IconX } from "@tabler/icons-react";
import {notifications} from "@mantine/notifications"
const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
              notifications.show({
                color: "blue",
                icon: <IconFreeRights />,
                limit: "1",
                title: "Success!!!",
                message: "user updated successfully",
              });
      refetch();
      navigate("/admin/userlist");
    } catch (error) {
              notifications.show({
                color: "red",
                icon: <IconX />,
                limit: "1",
                title: "Bummer!!!",
                message: error?.data?.message || error.error,
              });
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (

    <Container>
      <Link to="/admin/userlist">
      <Button leftSection={<IconArrowBack />} mb="xl">
        Go Back
      </Button>
      </Link>
      <Title>Edit User Detail</Title>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Paper shadow="xl">{error?.message || error.error}</Paper>
      ) : (
        <form onSubmit={submitHandler}>
          <TextInput
            label="Name"
            placeholder="Enter Name"
            mb="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            placeholder="Enter Email"
            mb="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Checkbox label="Is Admin" checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}  type="checkbox" />
          <Button type="submit">Update</Button>
        </form>
      )}
    </Container>
  );
};

export default UserEditScreen;

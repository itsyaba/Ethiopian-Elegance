import { IconCheck, IconEdit, IconTimeDuration45, IconTrash } from "@tabler/icons-react";
import Loader from "../../components/Loader";
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/usersApiSlice";
import { Container, Paper, Table, ThemeIcon, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const UserListScreen = () => {
  const { data : users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        // toast.error(err?.data?.message || err.error);
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <Title>Users</Title>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Paper shadow="xl">{error.data.message}</Paper>
      ) : (
        <Table withColumnBorders withTableBorder withRowBorders highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>NAME</Table.Th>
              <Table.Th>EMAIL</Table.Th>
              <Table.Th>ADMIN</Table.Th>
              <Table.Th> </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((user) => (
              <Table.Tr key={user._id}>
                <Table.Td>{user._id}</Table.Td>
                <Table.Td>{user.name}</Table.Td>
                <Table.Td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </Table.Td>
                <Table.Td>{user.isAdmin ? <IconCheck /> : <IconTimeDuration45 />}</Table.Td>
                <Table.Td>
                  {!user.isAdmin && (
                    <>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <ThemeIcon>
                          <IconEdit />
                        </ThemeIcon>
                      </Link>
                      <ThemeIcon onClick={() => deleteHandler(user._id)}>
                        <IconTrash />
                      </ThemeIcon>
                    </>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListScreen;

import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTimes, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <h1>UserListScreen</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {" "}
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/user/${user._id}/edit`}
                    variant="light"
                    className="btn-sm mx-2"
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;

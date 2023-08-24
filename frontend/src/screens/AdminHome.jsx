import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
const USERS_URL = "/api/users";

function Search(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    props.filterData(searchInput);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const getUsers = async () => {
    const res = await fetch(`${USERS_URL}/userslist`);
    const allUsers = await res.json();
    setUsers(allUsers);
    // console.log(allUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const response = await fetch(`${USERS_URL}/deleteuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    if (response.ok) {
      const userData = await response.json();
      setUsers(userData.users);
      navigate("/admin/adminhome");
    } else {
      alert("delete failed");
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${USERS_URL}/edituser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: id
        })
      });
  
      if (response.status === 200) {
        const userData = await response.json();
        navigate('/admin/edituserscreen');
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  const handleCreateNewUser = () => {
    navigate("/admin/newuserscreen");
  };

  const handleLogout = async () => {
    const logout = await fetch(`${USERS_URL}/adminout`,{
      method:"POST"
    })
    navigate("/admin");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
        className="mb-5"
      >
        {/*  Search component */}
        <Button variant="primary" size="lg" onClick={handleCreateNewUser}>
          Create User
        </Button>
        <Button variant="danger" size="md" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Button onClick={() => handleEdit(user._id)}>
                  <AiOutlineEdit />
                </Button>
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Button onClick={() => handleDelete(user._id)}>
                  <AiOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminHome;

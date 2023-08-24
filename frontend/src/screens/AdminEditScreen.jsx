import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer.jsx";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
const USERS_URL = "/api/users";

function AdminEditScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const { state } = useLocation();
  const userData = state?.userData;

  useEffect(() => {
    setName(userData?.name);
    setEmail(userData?.email);
    setImage(userData?.image);
  }, [userData]);

  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${USERS_URL}/edituser/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const userData = await response.json();

          console.log(userData);

        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    fetchUserData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${USERS_URL}/edituser`, { // Fix the URL here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userData._id,
          name,
          email,
          image,
        }),
      });
      if (res.status === 200) {
        toast.success("User Profile Edited");
        navigate("/admin/adminhome");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="image">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`/image/${image}`} // Fix the image source here
                alt="Profile"
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0].name)}
              />
            </div>
          </Form.Group>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default AdminEditScreen;

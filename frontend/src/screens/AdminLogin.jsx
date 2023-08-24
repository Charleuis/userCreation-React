import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const USERS_URL ='/api/users'

function AdminLogin() {
const [email,setEmail]=useState('')
const[password,setPassword]=useState('')

const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${USERS_URL}/adminlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    if(response.status===201){
        navigate('/admin/adminhome')
    }else{
     toast.error("Email or Password doesn't match")
    //  toast.error(data?.message || error)
    }
  };
  return (
    <FormContainer>
      <h1>Admin Log In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="formBasicPassword">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Check In
        </Button>
      </Form>
    </FormContainer>
  );
}

export default AdminLogin;

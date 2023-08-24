import React from "react";
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"

function Admin() {
  return (
    <>
      <ToastContainer/>
      <Container className="my-2">
        <Outlet/>
      </Container>
    </>
  )
}

export default Admin

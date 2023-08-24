import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import Admin from "./Admin.jsx";
import AdminLogin from "./screens/AdminLogin.jsx";
import AdminHome from "./screens/AdminHome.jsx";
import NewUserScreen from "./screens/NewUserScreen.jsx";
import AdminEditScreen from "./screens/AdminEditScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        {/* Private route accessable for logged in user */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route index={true} path="/admin" element={<AdminLogin />} />
        <Route path="/admin/adminhome" element={<AdminHome />} />
        <Route path="/admin/newuserscreen" element={<NewUserScreen />} />
        <Route path="/admin/edituserscreen" element={<AdminEditScreen />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

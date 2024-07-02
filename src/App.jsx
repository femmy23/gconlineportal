import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Account from "./routes/Account";
import PageNotFound from "./routes/PageNotFound";
import { Toaster } from "react-hot-toast";
import User from "./routes/User";
import Login from "./features/authentication/Login";
import Signup from "./features/authentication/Signup";
import "./App.css";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Posts from "./routes/Posts";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

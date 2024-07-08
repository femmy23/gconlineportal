import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Account from "./routes/Account";
import PageNotFound from "./routes/PageNotFound";
import { Toaster } from "react-hot-toast";
import User from "./routes/User";
import Login from "./features/authentication/Login";
import Signup from "./features/authentication/Signup";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Posts from "./routes/Posts";
import WithdrawDeposit from "./routes/WithdrawDeposit";
import Bonds from "./routes/Bonds";
import FixedTermDeposit from "./routes/FixedTermDeposit";
import "./App.css";
import ChangePassword from "./features/authentication/ChangePassword";
import ForgetPassword from "./features/authentication/ForgetPassword";

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
          <Route path="/account/bonds" element={<Bonds />} />

          <Route
            path="/account/FixedTermDeposit"
            element={<FixedTermDeposit />}
          />
          <Route
            path="/account/WithdrawDeposit"
            element={<WithdrawDeposit />}
          />
          <Route path="/user" element={<User />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

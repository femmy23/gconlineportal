import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { css, styled } from "styled-components";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import { supabase } from "./supabase";

const Body = styled.body`
  height: 100vh;
  background-color: #a0cee8;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  background-color: #fff;
  padding: 1rem 0.2rem;
  width: 30%;
  border-radius: 10px;
  @media screen and (max-width: 960px) {
    width: 80%;
  }
  @media screen and (max-width: 480px) {
    padding: 1rem 0rem;
    width: 90%;
  }
`;
const H2 = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;
const Span = styled.span`
  color: #e2070a;
`;
const Label = styled.label`
  display: inline-block;
  margin: 0.7rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  @media screen and (max-width: 960px) {
    margin: 1rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
const Input = styled.input`
  display: block;
  background-color: #fff;
  border: 1.5px solid #0068a4;
  width: 70%;
  outline: none;
  height: 1.2rem;
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
  font-size: 1rem;
  letter-spacing: 2px;
  &:focus {
    background-color: #dff3ff;
  }
`;
const InputGroup = styled.div`
  margin: 0 0.5rem;
  @media screen and (max-width: 480px) {
    margin: 0 0.1rem;
  }
`;
const Center = styled.div`
  text-align: center;
`;
const P = styled.p`
  margin: 1.3rem;
  font-size: 1rem;
`;
const Button = styled.button`
  background-color: #5e5ef0;
  border-radius: 18px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 0.6rem 2rem;
  cursor: pointer;
  margin: 1rem;
  ${(props) =>
    props.type === "show" &&
    css`
      /* display: flex; */
      border-radius: 3px;
      color: #fff;
      outline: none;
      border: none;
      font-size: 10px;
      padding: 5px;
      cursor: pointer;
      margin: 5px;
    `}
`;

export default function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullName: formData.fullName,
            username: formData.username,
          },
        },
      });
      if (error) throw error;

      toast.success("Account successfully created!");
      toast.success("verify account from your email address!");

      navigate("/login");
    } catch (error) {
      toast.error(`${error.message}, Try Again`);
    }
  }

  return (
    <>
      <AuthHeader />
      <Body>
        <Form onSubmit={handleSubmit}>
          <H2>Login to PIMCO</H2>
          <P>
            Already have an account?
            <Link className="link" to="/login">
              Login
            </Link>
          </P>

          <InputGroup>
            <Label>
              Full Name:<Span>*</Span>
            </Label>
            <Input
              name="fullName"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>
              Username:<Span>*</Span>
            </Label>
            <Input
              name="username"
              type="text"
              placeholder="dejzzy"
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>
              Email:<Span>*</Span>
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="femmy@info.uk"
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>
              Password:<Span>*</Span>
            </Label>
            <Button type="show" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide password" : "Show password"}
            </Button>
            <Input
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="*******"
              onChange={handleChange}
            />
          </InputGroup>

          <Center>
            <Button>Sign up</Button>
          </Center>
        </Form>
      </Body>
      <Footer />
    </>
  );
}

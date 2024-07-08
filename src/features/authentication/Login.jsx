import React from "react";
import { useState } from "react";
import { css, styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import AuthHeader from "../../components/AuthHeader";

const Body = styled.body`
  height: 80vh;
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
    width: 90%;
    padding: 1rem 0.5rem;
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
  @media screen and (max-width: 480px) {
    display: block;
    margin: 10px 0px;
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
const Linked = styled.a`
  color: #5e5ef0;
  text-decoration: none;
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

export default function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (!error && !data) {
        return <Spinner />;
      }

      if (error) throw error;

      toast.success("Logged In successfully!");
      navigate("/home");
      window.location.reload(false);
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
            New to PIMCO?
            <Link className="link" to="/signup">
              Create an Account
            </Link>
          </P>

          <InputGroup>
            <Label name="email">
              Email:<Span>*</Span>
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="dejzzy@info.uk"
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label name="password">
              Password:<Span>*</Span>
            </Label>
            <Button type="show" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide password" : "Show password"}
            </Button>
            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="*******"
              onChange={handleChange}
            />
          </InputGroup>

          <P>
            <Link className="link" to="/forgetPassword">
              Forgot Password
            </Link>
          </P>
          <Center>
            <Button>Login</Button>
          </Center>
        </Form>
      </Body>
      <Footer />
    </>
  );
}

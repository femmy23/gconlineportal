import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { supabase } from "../features/authentication/supabase";
import { fetchProfile } from "../features/services/FetchData";
import { MenuItems } from "./MenuItems";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  @media screen and (max-width: 480px) {
    margin: 0 1rem;
  }
`;

const Logo = styled.div`
  width: 13rem;
  height: 4rem;
`;
const Img = styled.img`
  z-index: 1000;
  width: 100%;
  height: 100%;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.type === "inactive" &&
    css`
      @media screen and (max-width: 900px) {
        display: none;
      }
    `}
  ${(props) =>
    props.type === "active" &&
    css`
      @media screen and (max-width: 900px) {
        align-items: stretch;
        padding: 80px 0 30px 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background: #eee;
        position: absolute;
        width: 100%;
        height: auto;
        top: 0;
        left: 0;
        opacity: 1;
        transition: var(--transition);
        border-radius: 13px;
        z-index: 10;
      }
    `};
`;
const Li = styled.li`
  list-style: none;
  margin: 1rem;
`;
const MenuIcon = styled.div`
  font-size: 1.3rem;
  display: none;
  z-index: 1000;
  @media screen and (max-width: 960px) {
    display: block;
  }
`;
const A = styled.a`
  color: #222;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  &:hover {
    color: #5e5ef0;
  }

  ${(props) =>
    props.type === "button" &&
    css`
      padding: 0.4rem 1rem;
      border-radius: 5px;
      color: #fff;
      background-color: #5e5ef0;
      &:hover {
        background-color: #5151d1;
        color: #fff;
      }
      @media screen and (max-width: 900px) {
        display: block;
        text-align: center;
      }
    `}
`;
const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 1rem;
  border-radius: 5px;
  color: #fff;
  background-color: #5e5ef0;
  &:hover {
    background-color: #5151d1;
    color: #fff;
  }
  @media screen and (max-width: 900px) {
    display: block;
    text-align: center;
  }
`;

export default function Header() {
  const [clicked, setClicked] = useState(false);
  const [isAdmin, setIsAdmin] = useState();

  const navigate = useNavigate();

  const onToggle = function () {
    setClicked(!clicked);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error("Error Signing Out" + error.message);
      }
      toast.success("User Signed Out Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const checker = async () => {
      const check = await fetchProfile();
      setIsAdmin(check);
    };
    checker();
  }, []);

  return (
    <HeaderContainer>
      <Logo className="logo">
        <Img src="./logo.png" href="/" alt="logo" />
      </Logo>
      <MenuIcon onClick={onToggle}>
        {clicked ? <FaTimes /> : <FaBars />}
      </MenuIcon>
      <Ul type={clicked ? "active" : "inactive"}>
        {MenuItems.map((item, i) => {
          return (
            <Li key={i}>
              <Link to={item.url} style={{ textDecoration: "none" }}>
                <A type={item.type}>{item.title}</A>
              </Link>
            </Li>
          );
        })}
        {isAdmin ? (
          <Li>
            <Link to="/post" style={{ textDecoration: "none" }}>
              <A type="nav-links">Post</A>
            </Link>
          </Li>
        ) : (
          ""
        )}

        <Button onClick={handleLogout}>Logout </Button>
      </Ul>
    </HeaderContainer>
  );
}

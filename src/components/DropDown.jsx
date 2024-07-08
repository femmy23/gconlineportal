import React, { useState } from "react";
import { Link } from "react-router-dom";
import { css, styled } from "styled-components";
import { accountDropdown } from "./MenuItems";

const Ul = styled.ul`
  background-color: #fff;
  width: 13rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 4rem;
  right: 9rem;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 480px) {
    width: 10rem;
    top: 7rem;
    right: 0.5rem;
  }

  ${(props) =>
    props.type === "hide" &&
    css`
      display: none;
    `}
`;
const Li = styled.li`
  list-style: none;
  padding: 1rem;
  /* width: 100%; */
`;

const A = styled.a`
  text-decoration: none;
  font-size: 1rem;
  display: block;
  width: 100%;
  height: 100%;
  color: #000;
  justify-content: center;
  &:hover {
    color: #5e5ef0;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
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
    `}
`;

export default function DropDown() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <Ul
      type={dropdown ? "hide" : "show"}
      onClick={() => setDropdown(!dropdown)}
    >
      {accountDropdown.map((item, i) => {
        return (
          <Li key={i}>
            <Link
              to={item.url}
              style={{ textDecoration: "none" }}
              onClick={() => setDropdown(false)}
            >
              <A type={item.type}>{item.title}</A>
            </Link>
          </Li>
        );
      })}
    </Ul>
  );
}

import React, { useEffect } from "react";
import { styled, css } from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: #a0cee8;
`;

const Logo = styled.div`
  width: 15rem;
  height: 5rem;
`;
const Img = styled.img`
  z-index: 1000;
  width: 100%;
  height: 100%;
`;

export default function AuthHeader() {
  return (
    <HeaderContainer>
      <Logo className="logo">
        <Img src="./logo.png" href="/" alt="logo" />
      </Logo>
    </HeaderContainer>
  );
}

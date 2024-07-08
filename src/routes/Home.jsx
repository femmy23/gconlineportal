import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchAccount } from "../features/services/fetchAccount";

const Views = styled.div`
  text-align: center;
  margin: 2rem;
  padding: 0.5rem;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const H3 = styled.h3`
  font-size: 1.8rem;
  margin: 0.8rem;
`;
const Button = styled.button`
  background-color: #5e5ef0;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 1.1rem;
  padding: 0.6rem 2rem;
  cursor: pointer;
  margin-top: 1rem;
`;

export default function Home() {
  const [balance, setBalance] = useState(0);

  const collect = async () => {
    const { bal } = await fetchAccount();
    setBalance(Number(bal.toFixed(2)).toLocaleString());
  };
  useEffect(() => {
    collect();
  }, []);

  return (
    <>
      <Header />
      <body>
        <Img src="bg.jpg" alt="Bg-image" />
        <Views>
          <H3>INVESTED TOTAL</H3>
          <H3>€{balance}</H3>

          <Link to="/account">
            <Button>View Account</Button>
          </Link>
        </Views>
        <hr />
        <Views>
          <H3>TRADING</H3>
          <H3>0</H3>
          <p>profit/loss</p>
          <Link to="/account">
            <Button>View Account</Button>
          </Link>
        </Views>
      </body>
      <Footer />
    </>
  );
}

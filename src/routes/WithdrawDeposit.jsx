import React from "react";
import { FaExclamation, FaStop } from "react-icons/fa";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MoveBack from "../components/MoveBack";

export default function WithdrawDeposit() {
  const Body = styled.body`
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Container = styled.body`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  `;

  const P = styled.p`
    display: flex;
    flex-wrap: wrap;
    text-align: "center";
  `;
  const H1 = styled.h1`
    /* margin: 1rem; */
    text-align: "center";
  `;
  const Icon = styled.div`
    background-color: #000;
    padding: 1rem 1.5rem;
    border-radius: 50%;
    font-size: 3rem;
    color: #fff;
  `;
  return (
    <>
      <Header />
      <MoveBack />
      <Body>
        <Container>
          <H1>Withdraw or Deposit</H1>
          <Icon>
            <FaExclamation />
          </Icon>
          <P>
            For any further deposits or withdrawals, please contact your
            dedicated account manager so they may assist you further.
          </P>
        </Container>
      </Body>
      <Footer />
    </>
  );
}

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MoveBack from "../components/MoveBack";
import { fetchAccount } from "../features/services/fetchAccount";

const H1 = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
`;
const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem;
`;
const H5 = styled.h5`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 4rem;
`;
const Acc = styled.div`
  margin: 3rem;
`;
const ParaText = styled.div`
  font-size: 1.2rem;
`;
const Center = styled.div`
  text-align: center;
`;
const Img = styled.img`
  width: 20rem;
  height: 13rem;
`;
const Button = styled.button`
  width: 80%;
  height: 2.5rem;
  margin: 0.5rem;
  color: #fff;
  outline: none;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background-color: #5e5ef0;
`;
const Table = styled.table`
  margin: 0 auto;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-top: 5rem;
`;
const Tr = styled.tr`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const Th = styled.th`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const Body = styled.body`
  margin-bottom: 3rem;
`;
const Td = styled.td`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const Tf = styled.tfoot`
  text-align: center;
  border: none;
  padding: 0.5rem;
  margin: ;
`;

export default function Bonds() {
  const [bondTotal, setBondTotal] = useState(0);
  const [account, setAccount] = useState([]);

  const collect = async () => {
    const { dataAccount } = await fetchAccount();

    const bondOnly = dataAccount?.filter((acc) => acc.bondType == "bond");

    if (bondOnly.length === 0) {
      setBondTotal(0);
      return;
    }

    const bnd = bondOnly
      ?.map((acc) => acc.bondPayment)
      ?.reduce((ac, cur) => Number(ac) + Number(cur));

    setBondTotal(bnd);
    setAccount(bondOnly);
  };

  useEffect(() => {
    collect();
  }, []);

  return (
    <>
      <Header />
      <MoveBack />
      <Body>
        <H1>Bonds</H1>

        {account?.map((acc, i) => {
          return (
            <Acc key={i}>
              <H2>{acc.bankname}</H2>
              <Img src={acc.bankImageUrl} alt={`${acc.bankname} image`} />
              <ParaText>
                Start Date: {acc.startDate}
                <br />
                Maturity Date:{acc.maturityDate}
                <br />
                Bond Number: {acc.bondNumber}
                <br />
                Investment: €{acc.investment} <br />
                Annual Return: {acc.annualReturn}%
              </ParaText>
            </Acc>
          );
        })}

        <Table>
          <Tr>
            <Th>Start Date:</Th>
            <Th>Maturity Date:</Th>
            <Th>Bond Number</Th>
            <Th>Investment</Th>
            <Th>Annual Return</Th>
            <Th>Total Interest</Th>
            <Th>Bond Payments</Th>
          </Tr>
          {account?.map((acc, i) => {
            return (
              <Tr key={i}>
                <Td>{acc.startDate}</Td>
                <Td>{acc.maturityDate}</Td>
                <Td>{acc.bondNumber}</Td>
                <Td>€{acc.investment}</Td>
                <Td>{acc.annualReturn}%</Td>
                <Td>€{acc.totalInterest}</Td>
                <Td>€{acc.bondPayment}</Td>
              </Tr>
            );
          })}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Th>€{bondTotal.toLocaleString()}</Th>
          </Tr>
        </Table>

        <Center>
          <Button>View Itemised Payments</Button>
          <Button>View Bonds Total</Button>
        </Center>
      </Body>
      <Footer />
    </>
  );
}

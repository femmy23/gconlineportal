import React from "react";
import { FaEnvelope, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { styled } from "styled-components";

const FooterSection = styled.footer`
  background-color: #1a0541;
  color: #dedcdc;
  padding: 2rem;
`;
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;
const Details = styled.div`
  width: 30%;
  @media screen and (max-width: 960px) {
    width: 90%;
    margin-top: 1rem;
  }
`;
const H4 = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const P = styled.p`
  display: flex;
  flex-wrap: wrap;
  line-height: 25px;
`;
const Icons = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem;
  @media screen and (max-width: 480px) {
    justify-content: center;
  }
`;
const IconsButton = styled.div`
  background-color: #5e5ef0;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 1.1rem;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  margin: 0.5rem;
  &:hover {
    background-color: #4848f1;
  }
`;
const Copyright = styled.div`
  background-color: #1a0541;
  color: #ccc;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  display: block;
`;

export default function Footer() {
  return (
    <FooterSection>
      <FooterContainer>
        <Details>
          <H4>PIMCO</H4>
          <P>
            PIMCO is an investment management firm providing solutions for
            institution, financial professionals and millions of individual
            worldwide. Learn More
          </P>
        </Details>
        <Details>
          <H4>Contact Info</H4>
          <P>Info@pimcoglobalwealth.com</P>
          <P>
            PIMCO (Schweiz) GmbH Brandschenkestrasse, 41 Zurich 8002 Switzerland
          </P>
        </Details>
        <Details>
          <H4>Get In Touch</H4>
          <P>
            For helpful resources, account assistance, and general contact,
            visit our Contact & Support Center. For more, access the additional
            links below.
          </P>
          <Icons>
            <IconsButton>
              <FaFacebook />
            </IconsButton>
            <IconsButton>
              <FaTwitter />
            </IconsButton>
            <IconsButton>
              <FaLinkedin />
            </IconsButton>
            <IconsButton>
              <FaEnvelope />
            </IconsButton>
          </Icons>
        </Details>
      </FooterContainer>
      <hr />
      <Copyright>Copyright © 2024 gconlineportal</Copyright>
    </FooterSection>
  );
}

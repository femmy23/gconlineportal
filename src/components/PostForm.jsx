import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { supabase } from "../features/authentication/supabase";
import { uploadBankImage } from "../features/services/uploadImage";
import MoveBack from "./MoveBack";

const Body = styled.body`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  background-color: #fff;
  padding: 1rem 0.5rem;
  width: 65%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    width: 80%;
    height: 100%;
  }
  @media screen and (max-width: 480px) {
    padding: 1rem 0rem;
    width: 95%;
    height: 100%;
  }
`;
const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: auto;
    align-items: center;
  }
`;
const InputGroup = styled.div`
  width: 40%;
  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;
const H1 = styled.h1`
  color: #000;
`;
const H2 = styled.h2`
  color: #333;
  margin: 1rem;
`;
const Span = styled.span`
  color: #e2070a;
`;
const Label = styled.label`
  display: inline-block;
  margin: 0.7rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  @media screen and (max-width: 960px) {
    margin: 1rem;
  }
  @media screen and (max-width: 480px) {
    margin: 0.5rem;
    font-size: 0.8rem;
  }
`;
const Input = styled.input`
  display: block;
  background-color: #eee;
  border: 0.5px solid #ccc;
  width: 100%;
  outline: none;
  height: 1.5rem;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  &:focus {
    background-color: #dff3ff;
  }
`;
const Select = styled.select`
  display: block;
  background-color: #eee;
  border: 0.5px solid #ccc;
  width: 100%;
  outline: none;
  height: 2.85rem;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  &:focus {
    background-color: #dff3ff;
  }
`;
const InputCheckbox = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const InputCheckboxes = styled.input`
  display: flex;
  background-color: #eee;
  border: 0.5px solid #ccc;
  width: 1rem;
  outline: none;
  height: 2rem;
`;
const Button = styled.button`
  background-color: #5e5ef0;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 0.9rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  margin: 1rem 3.5rem;
`;

export default function PostForm() {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [bankname, setBankName] = useState("Llyods");

  const [startDate, setStartDate] = useState();
  const [maturityDate, setMaturityDate] = useState();
  const [investment, setInvestment] = useState("");
  const [bondNumber, setBondNumber] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [bondType, setBondType] = useState("fixed-term-deposit");
  const [bankImage, setBankImage] = useState(null);
  const [files, setFiles] = useState(null);

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFiles(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let totalInterest = Number((annualReturn / 100) * investment).toFixed(2);
    let bondPayment = Number(
      Number(investment) + Number(totalInterest)
    ).toFixed(2);

    const bankImageUrl = await uploadBankImage(files);

    const newInterest = {
      startDate,
      maturityDate,
      investment,
      bondNumber,
      annualReturn,
      bondType,
      bankImageUrl,
      totalInterest,
      bondPayment,
    };

    const updateAccount = async () => {
      let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("username", username)
        .single();

      if (error) {
        toast.error("Error fetching interests:", error);
        return;
      }

      let updatedInterests = [...data.account, newInterest];
      console.log(updatedInterests);
      //
      let { error: updateError } = await supabase
        .from("profiles")
        .update({ account: updatedInterests })
        .eq("username", username);

      if (updateError) {
        console.error("Error updating interests:", updateError);
      } else {
        toast.success("Data added sucessfully");

        setUsername("");
        setBankName("");
        setBankImage(null);
        setStartDate("");
        setMaturityDate("");
        setInvestment("");
        setBondNumber("");
        setAnnualReturn("");
      }
    };
    updateAccount();
    setLoading(false);
  };

  return (
    <>
      <Header />
      <MoveBack />
      <Body>
        <H1>Account Post</H1>
        <Form onSubmit={handleSubmit}>
          <H2>About Receiver</H2>
          <FormRow>
            <InputGroup>
              <Label for="">
                Username:<Span>*</Span>
              </Label>
              <Input
                type="text"
                placeholder="jane"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label for="">
                Email:<Span>*</Span>
              </Label>
              <Input type="email" placeholder="jane@online.co" />
            </InputGroup>
          </FormRow>

          <H2>Bank Details</H2>
          <FormRow>
            <InputGroup>
              <Label for="">
                Bank Name:<Span>*</Span>
              </Label>
              <Input
                type="text"
                placeholder="Wells Fargo"
                value={bankname}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label for="">
                Bank Image:<Span>*</Span>
              </Label>
              <Input
                type="file"
                accept="image/*"
                required
                value={bankImage}
                onChange={handleFile}
              />
            </InputGroup>
          </FormRow>

          <H2>About Bond</H2>
          <FormRow>
            <InputGroup>
              <Label for="">
                Start Date:<Span>*</Span>
              </Label>
              <Input
                type="date"
                placeholder="mm/dd/yy"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label for="">
                Maturity Date:<Span>*</Span>
              </Label>
              <Input
                type="date"
                placeholder="mm/dd/yy"
                value={maturityDate}
                onChange={(e) => setMaturityDate(e.target.value)}
                required
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label for="">
                Bond Number:<Span>*</Span>
              </Label>
              <Input
                type="text"
                value={bondNumber}
                onChange={(e) => setBondNumber(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label for="">
                Investment:<Span>*</Span>
              </Label>
              <Input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value).toFixed(2)}
                required
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label for="">
                Annual Return:<Span>*</Span>
              </Label>
              <Input
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value).toFixed(2)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label for="">
                Bond Type:<Span>*</Span>
              </Label>
              <Select
                value={bondType}
                onChange={(e) => setBondType(e.target.value)}
              >
                <option value="Fixed-term-deposit">Fixed Term Deposit</option>
                <option value="bond">Bonds</option>
              </Select>
            </InputGroup>
          </FormRow>

          <InputCheckbox>
            <InputCheckboxes
              type="checkbox"
              value={bondType}
              onChange={(e) => setBondType(e.target.value)}
              required
            />
            confirm that all details are correct
          </InputCheckbox>

          <InputGroup>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>{" "}
          </InputGroup>
        </Form>
      </Body>
      <Footer />
    </>
  );
}

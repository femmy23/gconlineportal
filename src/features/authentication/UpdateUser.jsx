import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
// import Avatar from "../../components/Avatar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getCurrentUser } from "../services/FetchData";
import { updateData } from "../services/updateData";
import { uploadAvatar } from "../services/uploadImage";
import { supabase } from "./supabase";

const Body = styled.body`
  height: 100vh;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;
const Container = styled.div`
  background-color: #fff;
  margin: 3rem;
  width: 60%;
  display: flex;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 90%;
    margin: 0;
  }
  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 90%;
    margin: 1.5rem 1rem;
  }
`;
const Left = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  gap: 1rem;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const First = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const A = styled.a`
  text-decoration: none;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
`;
const H4 = styled.h4`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0.8rem;
  padding: 0;
`;
const Foremost = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const Span = styled.span`
  padding: 0.5rem;
  border-right: 1px solid #131313;
`;
const Right = styled.div`
  width: 70%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Form = styled.form`
  padding: 0.2rem;
  border-radius: 10px;
`;
const H2 = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;
const H5 = styled.h5`
  margin: 0;
  font-size: 1.3rem;
  text-align: center;
`;
const Label = styled.label`
  display: inline-block;
  margin: 0.7rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Red = styled.span`
  color: rgb(226, 7, 10);
`;
const Input = styled.input`
  display: block;
  background-color: #fff;
  border: 1.5px solid #0068a4;
  width: 80%;
  outline: none;
  height: 1.5rem;
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
  font-size: 1rem;
  letter-spacing: 2px;
`;
const InputGroup = styled.div`
  margin: 0 0.5rem;
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
  margin: 1rem;
`;
const Avatar = styled.img`
  width: 9rem;
  height: 9rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

//get The fields Value
export default function User() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [fullname, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [files, setFiles] = useState(null);
  const [image, setImage] = useState(null);

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFiles(e.target.files[0]);
  };

  useEffect(() => {
    getProfile();
  }, [image]);

  const getProfile = async () => {
    const userId = await getCurrentUser();
    try {
      async function getUserLinkedRow() {
        if (!userId) {
          console.error("User not authenticated");
          return;
        }
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching linked row:", error);
        } else {
          setFullName(data.fullname);
          setUsername(data.username);
          setEmail(data.email);
          setImage(data.avatar);
        }
      }

      getUserLinkedRow();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const avatar = await uploadAvatar(files);
    console.log(avatar);

    const user = getCurrentUser();

    const updates = {
      id: user.id,
      fullname,
      avatar,
      email,
      updated_at: new Date(),
    };

    try {
      updateData(updates);
      getProfile();
    } catch (error) {
      alert(error.message);
    }
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
      toast.danger(error.message);
    }
  };

  return (
    <>
      <Header />
      <Body>
        <Container>
          <Left>
            <First>
              <Avatar
                src={image ? image : "default-user.jpg"}
                alt={`Avatar of ${fullname}`}
              />
              <H5>{fullname}</H5>
              <A href="#"> View Profile</A>
            </First>
            <Options className="options">
              <Button>Delete Account</Button>
              <Button>Change Password</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </Options>
          </Left>

          <Right>
            <H2>Account</H2>
            <Form onSubmit={updateProfile}>
              <InputGroup>
                <Label for="">
                  Full Name:<Red>*</Red>
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="input-group">
                <Label for="">
                  Username:<Red>*</Red>
                </Label>
                <Input type="text" name="username" value={username} disabled />
              </InputGroup>

              <InputGroup className="input-group">
                <Label for="">
                  Email:<Red>*</Red>
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="dejzzy@info.uk"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <Label for="">
                  Bank Image:<Red>*</Red>
                </Label>
                <Input
                  type="file"
                  value={avatar_url}
                  accept="image/*"
                  onChange={handleFile}
                />
              </InputGroup>

              <Button>Update Profile</Button>
            </Form>
          </Right>
        </Container>
      </Body>
      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Spinner from "../../components/Spinner";
import { getSession } from "../services/getSession";
import Login from "./Login";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession()
      .then((response) => {
        setSession(response.session);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (session) {
      console.log(session);
    }
    // if (!session) navigate("/login");
  }, []);

  return <div>{session ? children : <Login />}</div>;
}

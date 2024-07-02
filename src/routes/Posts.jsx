import React, { useState } from "react";
import { useEffect } from "react";
import PostForm from "../components/PostForm";
import { fetchProfile } from "../features/services/FetchData";
import PageNotFound from "./PageNotFound";

export default function Posts() {
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const checker = async () => {
      const check = await fetchProfile();
      setIsAdmin(check);
    };
    checker();
  }, []);

  return <>{isAdmin ? <PostForm /> : <PageNotFound />}</>;
}

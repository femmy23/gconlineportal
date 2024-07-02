import React, { useState, useEffect } from "react";
import { supabase } from "../authentication/supabase";

export const getCurrentUser = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
  }
  const user = session?.user;
  if (user) {
    // console.log("Current user:", user);
    return user.id;
  } else {
    console.log("No user is signed in.");
  }
};

export const fetchProfile = async () => {
  const userId = await getCurrentUser();
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }
    console.log(data);
    return data.is_admin;
  } catch (error) {
    throw new Error("Error fetching profile: " + error.message);
  }
};

const fetchData = () => {
  fetchProfile();
};

export default fetchData;

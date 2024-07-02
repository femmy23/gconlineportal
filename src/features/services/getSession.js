import { useState } from "react";
import { supabase } from "../authentication/supabase";

export const getSession = async () => {
  const { isLoading, data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
  } else {
    return data;
  }
};

import { useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../authentication/supabase";
import { getCurrentUser } from "./FetchData";

export const fetchAccount = async () => {
  const userId = await getCurrentUser();
  let { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();

  if (error) {
    toast.error("Error fetching account:", error);
  } else {
    if (data.account.length === 0) {
      const bnd = 0;
      const bal = 0;
      const dataAccount = data.account;

      return { bnd, dataAccount, bal };
    } else {
      const bnd = data.account
        ?.map((acc) => acc.bondPayment)
        ?.reduce((ac, cur) => Number(ac) + Number(cur));

      const bal = data.account
        ?.map((acc) => acc.investment)
        ?.reduce((ac, cur) => Number(ac) + Number(cur));

      const dataAccount = data.account;

      return { bnd, dataAccount, bal };
    }
  }
};

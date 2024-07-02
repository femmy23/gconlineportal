import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Login from "../features/authentication/Login";
import { supabase } from "../features/authentication/supabase";
import UpdateUser from "../features/authentication/UpdateUser";

export default function User() {
  return <UpdateUser />;
}

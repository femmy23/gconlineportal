import { useNavigate } from "react-router";
import { supabase } from "../authentication/supabase";

export const handleLogout = async () => {
  const navigate = useNavigate();
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

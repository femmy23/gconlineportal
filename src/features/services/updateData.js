import { toast } from "react-hot-toast";
import { supabase } from "../authentication/supabase";

const getCurrentSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
    return null;
  }

  if (session) {
    console.log("Current session:", session);
  } else {
    console.log("No active session found");
  }

  return session;
};

export const updateData = async ({
  fullname,
  email,
  avatar,
  updated_at,
  id,
}) => {
  const session = await getCurrentSession();
  if (!session) {
    console.error("User not authenticated");
    return;
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("profiles")
    .update({ fullname, avatar, email, updated_at, id })
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error);
  } else {
    toast.success("Updated Successfully");
  }
};

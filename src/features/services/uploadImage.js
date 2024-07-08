import { toast } from "react-hot-toast";
import { supabase } from "../authentication/supabase";
import { getCurrentUser } from "./FetchData";

export async function uploadBankImage(file) {
  const rand = Math.random();
  const userId = await getCurrentUser();
  // Step 1: Upload the new image
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("bankImage")
    .upload(`${userId}-${rand}.png`, file);

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError.message);
    return;
  }
  console.log(uploadData);

  // Step 2: Generate a public URL for the image
  const { data: publicURL, error: urlError } = supabase.storage
    .from("bankImage")
    .getPublicUrl(`${userId}-${rand}.png`);

  if (publicURL) {
    console.log(publicURL.publicUrl);
    return publicURL.publicUrl;
  } else {
    console.error("Error getting public URL:", urlError);
    return;
  }
}

export async function uploadAvatar(file) {
  const rand = Math.random();
  const userId = await getCurrentUser();
  // Step 1: Upload the new image
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(`${userId}-${rand}-${file?.name}.png`, file);

  if (uploadData) {
    console.log(uploadData);
  } else {
    console.error("Error uploading avatar:", uploadError.message);
    return;
  }

  // Step 2: Generate a public URL for the image
  const { data: publicURL, error: urlError } = supabase.storage
    .from("avatars")
    .getPublicUrl(`${userId}-${rand}-${file?.name}.png`);

  if (publicURL) {
    console.log(publicURL.publicUrl);
    return publicURL.publicUrl;
  } else {
    console.error("Error getting public URL:", urlError);
    return;
  }
}

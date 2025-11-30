import supabase, { supabaseUrl as SUPABASE_URL } from "./supabase";
import { SUPABASE_BUCKET_PATH } from "../constants";
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Carbin không thể tải");
  }

  return cabins;
}

export async function createCarbin(newCarbin) {
  const imageName = `${Math.random()}-${newCarbin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${SUPABASE_URL}/${SUPABASE_BUCKET_PATH}/${imageName}`;

  // create
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCarbin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Carbin không thể tạo mới");
  }

  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCarbin.image, {
      cacheControl: "3600",
      upsert: false,
    });
  
  // delete carbin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Ảnh Carbin không thể tải trong quá khi tạo mới");
  }

  return data;
}

export async function deleteCarbin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Carbin không thể xóa");
  }
  return data;
}

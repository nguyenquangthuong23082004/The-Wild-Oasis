import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Carbin không thể tải");
  }

  return cabins;
}

export async function createCarbin(newCarbin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCarbin])
    .select();
  
  if (error) {
    console.error(error);
    throw new Error("Carbin không thể tạo mới");
  }

  return data
}

export async function deleteCarbin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Carbin không thể xóa");
  }
  return data;
}

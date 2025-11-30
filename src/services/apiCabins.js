import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Carbin không thể tải")
  }

  return cabins;
}

export async function deleteCarbin(id) {
  const {data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if (error) {
    console.error(error);
    throw new Error("Carbin không thể xóa")
  }
  return data;
}

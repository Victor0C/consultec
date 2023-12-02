import api from "../api";
import  {Atalho}  from "./Atalho";

const cadastraAtalho = async (atalho: Omit<Atalho, "_id">) => {
  const { data } = await api.post<Atalho>(`/urls`, atalho);
  return data;
};

export default cadastraAtalho;

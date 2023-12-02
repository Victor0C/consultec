import api from "../api";

import { Atalho } from "./Atalho";

const editaAtalho = async (
  _id: string | undefined,
  atalho: Omit<Atalho,  | "idcontador" >
) => {
  const { data } = await api.put<Atalho>( `/urls/${_id}`, atalho);
  return data;
};

export default editaAtalho;

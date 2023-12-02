import api from "../api";

import { Atalho } from "./Atalho";

const listaAtalhos = async (params?: { nome?: string }) => {
  const { data } = await api.get<Atalho[]>(`/urls`, {
    params,
  });
  return data;
};

export default listaAtalhos;

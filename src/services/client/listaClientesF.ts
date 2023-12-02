import api from "../api";

import { Clientes } from "./Clientes";

const listaClientes = async (params?: { apelido?: string }) => {
  const { data } = await api.get<Clientes[]>("/client?tipopessoa=F", {
    params,
  });
  return data;
};

export default listaClientes;

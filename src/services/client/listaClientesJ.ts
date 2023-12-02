import api from "../api";

import { Clientes } from "./Clientes";

const listaClientes = async (params?: { fantasia?: string }) => {
  const { data } = await api.get<Clientes[]>("/client?tipopessoa=J", {
    params,
  });
  return data;
};

export default listaClientes;

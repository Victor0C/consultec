import api from "../api";
import { Clientes } from "./Clientes";

const editaCliente = async (cliente: Omit<Clientes, "_id">, id: string) => {
  const { data } = await api.put<Clientes>(`/client/${id}`, cliente);
  return data;
}

export default editaCliente
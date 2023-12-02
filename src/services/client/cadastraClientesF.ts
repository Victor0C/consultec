import api from "../api";
import { Clientes } from "./Clientes";

const cadastraClienteF = async (cliente: Omit<Clientes, "_id" >) => {
    const { data } = await api.post<Clientes>("/client/fisico", cliente);
    return data;
  };
 export default cadastraClienteF

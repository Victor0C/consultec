import api from "../api";
import { Funcionarios } from "./Funcionarios";

const listaFuncionario = async (_id?: string) => {
  const { data } = await api.get<Funcionarios>(`/employee/${_id}`);
  return data;
};

export default listaFuncionario
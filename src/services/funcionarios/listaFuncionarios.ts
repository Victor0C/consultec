import api from "../api";
import { Funcionarios } from "./Funcionarios";


interface Typeparams{
  id: string,
  nome?: string

}
const listaFuncionarios = async (params: Typeparams) => {
  const { data } = await api.get<Funcionarios[]>(`employees/client/${params.id}${params.nome ? "?nome=" + params.nome : ""}`);
  return data;
};

export default listaFuncionarios
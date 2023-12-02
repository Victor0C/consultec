import api from "../api";
import { Funcionarios } from "./Funcionarios";


const editaFuncionario = async (funcionario: Funcionarios) => {
  const { data } = await api.put<Funcionarios>(`/employees/${funcionario._id}`, funcionario);
  return data;
}

export default editaFuncionario
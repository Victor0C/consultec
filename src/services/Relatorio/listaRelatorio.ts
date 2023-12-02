import api from "../api";
import { Relatorio } from "./Relatorio";

const listaRelatorio = async (_id: string) => {
  const { data } = await api.get<Relatorio>(`/report/${_id}`);
  return data;
};

export default listaRelatorio
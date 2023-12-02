import api from "../api";

import { Certificado } from "./Certificado";

interface Typeparams{
  id: string,
  nome?: string

}
const listaCertificadoById = async (params: Typeparams) => {
  const { data } = await api.get<Certificado[]>(
    `/certificate/client/${params.id}${params.nome ? "?nome=" + params.nome : ""}`)
  return data;
};

export default listaCertificadoById;

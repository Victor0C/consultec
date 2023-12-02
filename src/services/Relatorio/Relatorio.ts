import { Certificado } from "../certificado/Certificado";
import { Clientes } from "../client/Clientes";
import { Funcionarios } from "../funcionarios/Funcionarios";

export interface Relatorio {
  cliente: Clientes;
  certificados: Certificado[];
  funcionarios: Funcionarios[];
}

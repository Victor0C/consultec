import { Container, Divider, Flex, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Clientes } from "../../services/client/Clientes";
import listaClientes from "../../services/client/listaTodosClientes";
import style from "./pdf.module.css";


export default function PDFTodososClientes() {

  const { data } = useQuery({
    queryKey: ["ClientesRelatorio"],
    queryFn: async () => listaClientes(),
  });

  const juridicos = data?.map((cliente) => {if(cliente.tipopessoa === 'J' && cliente.contrato){return cliente}}).filter((cliente) => cliente !== undefined);
  const fisicos = data?.map((cliente) => {if(cliente.tipopessoa ==='F'  && cliente.contrato){return cliente}}).filter((cliente) => cliente !== undefined);

  
  data?.forEach((cliente) => {
    if(cliente.tipopessoa === 'J' && !cliente.contrato){juridicos?.push(cliente)}
  })

  data?.forEach((cliente) => {
    if(cliente.tipopessoa === 'F' && !cliente.contrato){fisicos?.push(cliente)}
  })

 

  const todosCamposPreenchidos = (data: Clientes) => {
    return data?.cgc;
  };

  useEffect(() => {
    if (data && todosCamposPreenchidos(data[0])) {
      window.print();
    }
  }, [data]);

  const contrato = (situacao?: boolean) => {
    return situacao ? "Ativo" : "Inativo";
  };

  const clientesJuridicos = juridicos?.map((cliente) => (
    <tr key={cliente?.razaosocial}>
      <td>{cliente?.apelido || cliente?.fantasia}</td>
      <td>{cliente?.nomecompleto || cliente?.razaosocial}</td>
      <td>{cliente?.cgc}</td>
      <td>{contrato(cliente?.contrato)}</td>
    </tr>
  ));


  const clientesFisicos = fisicos?.map((cliente) => (
    <tr key={cliente?.nomecompleto}>
      <td>{cliente?.apelido}</td>
      <td>{ cliente?.nomecompleto}</td>
      <td>{cliente?.cgc}</td>
      <td>{contrato(cliente?.contrato)}</td>
    </tr>
  ));

  return (
    <Container mt="xl">
      <Text size="xl" weight="bold">
        Relatório de todos os clientes ({`${data?.length}`}) 
      </Text>
      <Divider size="xs" />

      <Text size="xl" weight="bold" mt="lg" mb="sm">
        ■ Cadastrsos juridicos ({juridicos?.length})
      </Text>
      <Flex className={style.Info}>
        <Table horizontalSpacing="md">
          <thead>
            <tr>
              <th>Fantasia</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Contrato</th>
            </tr>
          </thead>
          <tbody>{clientesJuridicos}</tbody>
        </Table>
      </Flex>


      <Text size="xl" weight="bold" mt="lg" mb="sm">
        ■ Cadastros fisicos ({fisicos?.length})
      </Text>
      <Flex className={style.Info}>
        <Table horizontalSpacing="md">
          <thead>
            <tr>
              <th>Apelido</th>
              <th>Nome completo</th>
              <th>CNPJ</th>
              <th>Contrato</th>
            </tr>
          </thead>
          <tbody>{clientesFisicos}</tbody>
        </Table>
      </Flex>
      <Divider />
    </Container>
  );
}

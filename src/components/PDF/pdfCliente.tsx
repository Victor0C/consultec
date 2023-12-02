import { Container, Divider, Flex, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import style from "./pdf.module.css";
import { useEffect } from "react";
import listaRelatorio from "../../services/Relatorio/listaRelatorio";
import { Clientes } from "../../services/client/Clientes";


export default function PDFCliente() {
  const { id } = useParams() as { id: string };

  const { data } = useQuery({
    queryKey: ["Relatorio"],
    queryFn: async () => listaRelatorio(id),
  });

  const todosCamposPreenchidos = (data: Clientes) => {
    return data?.cgc;
  };

  useEffect(() => {
    if (data && todosCamposPreenchidos(data.cliente)) {
      window.print();
    }
  }, [data?.cliente]);

  const TodosCertificados = data?.certificados.map((certificado) => (
    <tr key={certificado.nome}>
      <td>{certificado.nome}</td>
      <td>{certificado.senha}</td>
      <td>{certificado.descricao}</td>
      <td>{certificado.dtvalidade}</td>
    </tr>
  ));

  const Todosfuncionarios = data?.funcionarios.map((funcionario) => (
    <tr key={funcionario.nome}>
      <td>{funcionario.nome}</td>
      <td>{funcionario.cpf}</td>
      <td>{funcionario.funcao}</td>
      <td>{funcionario.telefone}</td>
    </tr>
  ));

  const inscriçãoEstadual = (cliente?: Clientes) => {
    if (cliente?.tipopessoa === "J") {
      return (
        <>
          <Divider size="xs" />
          <Flex gap="xs" className={style.informacoes}>
            <Text className={style.destaque}>IE:</Text>
            <Text>{data?.cliente.ie}</Text>
          </Flex>
        </>
      );
    }
  };

  const planos = (
    plcontabil?: boolean,
    plfiscal?: boolean,
    plpessoal?: boolean
  ) => {
    const planosAtivos = [];
    if (plcontabil) {
      planosAtivos.push("Contábil");
    }
    if (plfiscal) {
      planosAtivos.push("Fiscal");
    }
    if (plpessoal) {
      planosAtivos.push("Pessoal");
    }
    return planosAtivos.join(", ");
  };

  const contrato = (situacao?: boolean) => {
    return situacao ? "Ativo" : "Inativo";
  };

  return (
    <Container mt="xl">
      <Text size="xl" weight="bold">
        Relatório geral de {data?.cliente.fantasia || data?.cliente.apelido} (
        {`${contrato(data?.cliente.contrato)}`})
      </Text>
      <Divider />
      <Flex className={style.Info} mt="xs" wrap="wrap" direction="column">
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>
            {data?.cliente.razaosocial ? "Razão social:" : "Nome:"}
          </Text>
          <Text>{data?.cliente.razaosocial || data?.cliente.nomecompleto}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>
            {data?.cliente.fantasia ? "Fantasia:" : "Apelido:"}
          </Text>
          <Text>{data?.cliente.fantasia || data?.cliente.apelido}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Telefone:</Text>
          <Text>{data?.cliente.telefone}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>E-mail:</Text>
          <Text>{data?.cliente.email}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>
            {data?.cliente.tipopessoa === "F" ? "CPF:" : "CNPJ:"}
          </Text>
          <Text>{data?.cliente.cgc}</Text>
        </Flex>
        {inscriçãoEstadual(data?.cliente)}
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Atividade:</Text>
          <Text>{data?.cliente.ramoatividade}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>CNAE:</Text>
          <Text>{data?.cliente.cnae}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs">
          <Text className={style.destaque}>Planos:</Text>
          <Text>{`${planos(
            data?.cliente.plcontabil,
            data?.cliente.plfiscal,
            data?.cliente.plpessoal
          )}`}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Logradouro:</Text>
          <Text>{data?.cliente.logradouro}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Número:</Text>
          <Text>{data?.cliente.numero}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Bairro:</Text>
          <Text>{data?.cliente.bairro}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Cidade:</Text>
          <Text>{data?.cliente.cidade}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Complemento:</Text>
          <Text>{data?.cliente.complemento}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Estado:</Text>
          <Text>{data?.cliente.estado}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>CEP:</Text>
          <Text>{data?.cliente.cep}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>País:</Text>
          <Text>{data?.cliente.pais}</Text>
        </Flex>
        <Divider size="xs" />
      </Flex>

      <Text size="xl" weight="bold" mt="lg" mb="sm">
        ■ Certificados ({data?.certificados.length})
      </Text>
      <Flex className={style.Info}>
        <Table horizontalSpacing="md">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Senha</th>
              <th>Descrição</th>
              <th>Validade</th>
            </tr>
          </thead>
          <tbody>{TodosCertificados}</tbody>
        </Table>
      </Flex>
      <Text size="xl" weight="bold" mt="lg" mb="sm">
        ■ Funcionários ({data?.funcionarios.length})
      </Text>
      <Flex className={style.Info}>
        <Table horizontalSpacing="md">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Função</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>{Todosfuncionarios}</tbody>
        </Table>
      </Flex>
    </Container>
  );
}

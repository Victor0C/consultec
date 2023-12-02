import { Container, Divider, Flex, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./pdf.module.css";
import { Funcionarios } from "../../services/funcionarios/Funcionarios";
import listaFuncionario from "../../services/funcionarios/InfoFuncionario";


export default function PDFFuncionario() {
  const { id, empresa } = useParams() as { id: string; empresa: string };

  const { data } = useQuery({
    queryKey: ["Funcionario"],
    queryFn: async () => await listaFuncionario(id),
  });

  const todosCamposPreenchidos = (data: Funcionarios) => {
    return data?.cpf;
  };

  useEffect(() => {
    if (data && todosCamposPreenchidos(data)) {
      window.print();
    }
  }, [data]);

  const campoInativo = (campo?: string) => {
    if (campo !== "") {
      return (
        <>
          <Flex gap="xs" className={style.informacoes}>
            <Text className={style.destaque}>Inativação:</Text>
            <Text>{data?.data_inativo}</Text>
          </Flex>
          <Divider size="xs" />
        </>
      );
    }
  };

  return (
    <Container mt="xl">
      <Text size="xl" weight="bold">
        Relatório geral do funcionário {data?.nome} em {empresa} (
        {`${data?.ativo ? "Ativo" : "Inativo"}`})
      </Text>
      <Divider />
      <Flex className={style.Info} mt="xs" wrap="wrap" direction="column">
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Nome</Text>
          <Text>{data?.nome}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>CPF:</Text>
          <Text>{data?.cpf}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>RG:</Text>
          <Text>{data?.rg}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>PIS:</Text>
          <Text>{data?.pis}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Telefone:</Text>
          <Text>{data?.telefone}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>CGC do empregador:</Text>
          <Text>{data?.cnpjempregador}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Cargo:</Text>
          <Text>{data?.cargo}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Função:</Text>
          <Text>{data?.funcao}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Nascimento:</Text>
          <Text>{data?.dtnasc}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Mãe:</Text>
          <Text>{data?.mae}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Pai:</Text>
          <Text>{data?.pai}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>CEP:</Text>
          <Text>{data?.cep}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Cidade:</Text>
          <Text>{data?.cidade}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Logradouro:</Text>
          <Text>{data?.logradouro}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Número:</Text>
          <Text>{data?.numero}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Bairro:</Text>
          <Text>{data?.bairro}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Complemento:</Text>
          <Text>{data?.complemento}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Estado:</Text>
          <Text>{data?.estado}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>País:</Text>
          <Text>{data?.pais}</Text>
        </Flex>
        <Divider size="xs" />
        <Flex gap="xs" className={style.informacoes}>
          <Text className={style.destaque}>Ativação:</Text>
          <Text>{data?.data_ativo}</Text>
        </Flex>
        <Divider size="xs" />
        {campoInativo(data?.data_inativo)}
      </Flex>
    </Container>
  );
}

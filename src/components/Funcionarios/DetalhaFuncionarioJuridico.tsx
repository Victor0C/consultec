import { Divider, Flex, Text } from "@mantine/core";
import style from "./DetalhaFuncionarios.module.css";

interface Funcionario {
  funcionario: {
    nome: string;
    cpf: string;
    rg: string;
    pis: string;
    mae: string;
    pai: string;
    dtnasc: string;
    telefone: string;
    cargo: string;
    funcao: string;
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
    cep: string;
    pais: string;
    ativo: Boolean;
    data_ativo: string;
    data_inativo: string;
  };

  close: () => void;
}

export default function DetalhaFuncionario(props: Funcionario) {
  const inativo = (
    <Flex gap="xs">
      <Text className={style.destaque}>Data de inativação:</Text>
      <Text>{`${props.funcionario.data_inativo}`}</Text>
    </Flex>
  );

  const sepracao = <Divider size="xs" />;

  return (
    <Flex gap="xs" wrap="wrap" direction="column">
      <Flex gap="xs">
        <Text className={style.destaque}>Situação:</Text>
        <Text>{`${props.funcionario.ativo ? "Ativo" : "Inativo"}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Nome:</Text>
        <Text>{`${props.funcionario.nome}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>CPF:</Text>
        <Text>{`${props.funcionario.cpf}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>RG:</Text>
        <Text>{`${props.funcionario.rg}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>PIS:</Text>
        <Text>{`${props.funcionario.pis}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Mãe:</Text>
        <Text>{`${props.funcionario.mae}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Pai:</Text>
        <Text>{`${props.funcionario.pai}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Nascimento:</Text>
        <Text>{`${props.funcionario.dtnasc}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Telefone:</Text>
        <Text>{`${props.funcionario.telefone}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Cargo:</Text>
        <Text>{`${props.funcionario.cargo}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Função:</Text>
        <Text>{`${props.funcionario.funcao}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Logradouro:</Text>
        <Text>{`${props.funcionario.logradouro}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Número:</Text>
        <Text>{`${props.funcionario.numero}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Cidade:</Text>
        <Text>{`${props.funcionario.cidade}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Estado:</Text>
        <Text>{`${props.funcionario.estado}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>CEP:</Text>
        <Text>{`${props.funcionario.cep}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>País:</Text>
        <Text>{`${props.funcionario.pais}`}</Text>
      </Flex>
      <Divider size="xs" />
      <Flex gap="xs">
        <Text className={style.destaque}>Data de ativação:</Text>
        <Text>{`${props.funcionario.data_ativo}`}</Text>
      </Flex>
      {props.funcionario.data_inativo ? sepracao : null}
      {props.funcionario.data_inativo ? inativo : null}
      {props.funcionario.data_inativo ? sepracao : null}
    </Flex>
  );
}

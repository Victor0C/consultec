import { Button, Card, Flex, Text, TextInput, Title } from "@mantine/core";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Funcionarios } from "../../services/funcionarios/Funcionarios";
import deleteFuncionario from "../../services/funcionarios/deletaFuncionario";
import listaFuncionarios from "../../services/funcionarios/listaFuncionarios";
import Acoes from "../Acoes";
import DetalhaFuncionario from "./DetalhaFuncionarioJuridico";
import style from "./ListaFuncionario.module.css";
import ModalCadFuncionarios from "./ModalCadFuncionarios";
import ModaleEditFuncionario from "./ModalEditFuncionario";

interface PropsData {
  id: string;
  cgc?: string;
  nome?: string;
}

export default function ListaFuncionario(props: PropsData) {
  const isMobile = useMediaQuery("(max-width: 50em)");

  const [searchFuncionario, setSearchFuncionario] = useState("");
  const [debouncedSeachValue] = useDebouncedValue(searchFuncionario, 500);

  const { data, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["funcionario", debouncedSeachValue],
    queryFn: async () =>
      listaFuncionarios({
        id: props.id,
        nome: debouncedSeachValue || undefined,
      }),
  });

  const atualizaDados = () => {
    refetch();
  };

  const AbreModalCadastrarFuncioario = () => {
    modals.open({
      title: "Cadastrar funcionário",
      children: (
        <ModalCadFuncionarios
          idCliente={props.id}
          cgc={props.cgc}
          close={modals.closeAll}
          onSuccess={atualizaDados}
        />
      ),
    });
  };

  const AbreModalDetalhaFuncioario = (
    dados: Omit<Funcionarios, "_id" | "cnpjempregador" | "idcliente">
  ) => {
    modals.open({
      title: "Cadastrar funcionário",
      children: (
        <DetalhaFuncionario funcionario={dados} close={modals.closeAll} />
      ),
      size: "sm",
    });
  };

  const AbreModalEditaFuncioario = (dados: Omit<Funcionarios, "idcliente">) => {
    modals.open({
      title: "Cadastrar funcionário",
      children: (
        <ModaleEditFuncionario
          funcionario={dados}
          idCliente={props.id}
          cgc={props.cgc}
          close={modals.closeAll}
          onSuccess={atualizaDados}
        />
      ),
    });
  };

  const exclui = async (id: string) => {
    try {
      await deleteFuncionario(id);
      showNotification({
        title: "Ok",
        message: "Exclusão efetuada com sucesso!",
        color: "green",
      });
      refetch().catch(() => {});
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error?.response?.data?.message
          : "Ocorreu um erro ao excluir. Por favor, tente novamente";
      showNotification({
        title: "Erro",
        message,
        color: "red",
      });
    }
  };

  const abreDialogDeExclusao = (id: string, nome: string) =>
    modals.openConfirmModal({
      title: "Exclusão",
      children: (
        <Text size="sm">Tem certeza em excluir o funcionário {nome}?</Text>
      ),
      labels: { confirm: "Confirmar Exclusão", cancel: "Cancelar" },
      onConfirm: () => exclui(id),
    });

  return (
    <Flex direction="column">
      <Flex justify="center" mb="xs">
        <Title order={2} className={style.titulo}>
          Funcionários
        </Title>
      </Flex>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="cards">
        <TextInput
          icon={<BiSearchAlt />}
          mb={10}
          placeholder="Encontre o funcionário pelo nome"
          value={searchFuncionario}
          onChange={(event) => setSearchFuncionario(event.currentTarget.value)}
        />
        <DataTable
          minHeight={120}
          striped
          highlightOnHover
          horizontalSpacing="xs"
          verticalAlignment="center"
          className={style.tabela}
          records={data}
          fetching={isFetching || isRefetching}
          idAccessor="cpf"
          columns={
            !isMobile
              ? [
                  { accessor: "nome", title: "Nome", textAlignment: "center" },
                  { accessor: "cpf", title: "CPF", textAlignment: "center" },
                  {
                    accessor: "rg",
                    title: "RG",
                    textAlignment: "center",
                  },
                  {
                    accessor: "funcao",
                    title: "Função",
                    textAlignment: "center",
                  },
                  {
                    accessor: "telefone",
                    title: "Tell",
                    textAlignment: "center",
                  },
                  {
                    accessor: "",
                    title: "Ações",
                    textAlignment: "right",
                    render: (data) => (
                      <Acoes
                        acaoDetalhar={() => AbreModalDetalhaFuncioario(data)}
                        acaoEditar={() => AbreModalEditaFuncioario(data)}
                        acaoExcluir={() =>
                          abreDialogDeExclusao(data._id, data.nome)
                        }
                        acaoExportar={() =>
                          window.open(
                            `/funcionario/pdf/${props.nome}/${data._id}`
                          )
                        }
                      />
                    ),
                  },
                ]
              : [
                  { accessor: "nome", title: "Nome", textAlignment: "center" },
                  { accessor: "cpf", title: "CPF", textAlignment: "center" },
                ]
          }
          rowContextMenu={
            isMobile
              ? {
                  trigger: "click",
                  items: (record) => [
                    {
                      key: "Detalhar",
                      onClick: () => AbreModalDetalhaFuncioario(record),
                    },
                    {
                      key: "Editar",
                      onClick: () => AbreModalEditaFuncioario(record),
                    },
                    {
                      key: "Exportar",
                      onClick: () =>
                        window.open(
                          `/funcionario/pdf/${props.nome}/${record._id}`
                        ),
                    },
                    {
                      key: "Excluir",
                      onClick: () =>
                        abreDialogDeExclusao(record._id, record.nome),
                    },
                  ],
                }
              : undefined
          }
          noRecordsText="Nenhum registro encontrado!"
        />
      </Card>
      <Flex justify="flex-end" mt="xs">
        <Button
          className="botao"
          onClick={() => AbreModalCadastrarFuncioario()}
        >
          +
        </Button>
      </Flex>
    </Flex>
  );
}

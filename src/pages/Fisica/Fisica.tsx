import { Text, TextInput } from "@mantine/core";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Acoes from "../../components/Acoes";
import BotaoAdicionar from "../../components/BotãoAdicionar/BotaoAdicionar";
import { Clientes } from "../../services/client/Clientes";
import deleteClient from "../../services/client/deletaCliente";
import listaClientesF from "../../services/client/listaClientesF";

export default function Fisica() {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const abreDialogDeExclusao = (data: Clientes) =>
    modals.openConfirmModal({
      title: "Exclusão",
      children: (
        <Text size="sm">
          Tem certeza em excluir o cliente de CPF {data.cgc}?
        </Text>
      ),
      labels: { confirm: "Confirmar Exclusão", cancel: "Cancelar" },
      onConfirm: () => exclui(data._id),
    });

  const navigate = useNavigate();

  const [searchApelido, setSearchApelido] = useState("");
  const [debouncedSeachValue] = useDebouncedValue(searchApelido, 500);

  const { data, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["client", debouncedSeachValue],
    queryFn: async () =>
      listaClientesF({ apelido: debouncedSeachValue || undefined }),
  });

  const exclui = async (cgc: string) => {
    try {
      await deleteClient(cgc);
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

  return (
    <div>
      <TextInput
        icon={<BiSearchAlt />}
        mb={10}
        placeholder="Encontre o cliente pelo nome apelido"
        value={searchApelido}
        onChange={(event) => setSearchApelido(event.currentTarget.value)}
      />
      <DataTable
        minHeight={132}
        withBorder
        shadow="sm"
        striped
        highlightOnHover
        horizontalSpacing="xs"
        fetching={isFetching || isRefetching}
        verticalAlignment="center"
        records={data}
        idAccessor="_id"
        columns={
          !isMobile
            ? [
                {
                  accessor: "apelido",
                  title: "Apelido",
                  textAlignment: "center",
                },
                { accessor: "cgc", title: "CPF", textAlignment: "center" },
                {
                  accessor: "telefone",
                  title: "Tell",
                  textAlignment: "center",
                },
                { accessor: "email", title: "E-mail", textAlignment: "center" },
                {
                  accessor: "",
                  title: "Ações",
                  textAlignment: "right",
                  render: (data) => (
                    <Acoes
                      acaoDetalhar={() => {
                        navigate(`/cliente/fisico/${data._id}`);
                      }}
                      acaoEditar={() =>
                        navigate(`/cliente/editar/fisico/${data._id}`)
                      }
                      acaoExcluir={() => abreDialogDeExclusao(data)}
                      acaoExportar={() => window.open(`/pdf/${data._id}`)}
                    />
                  ),
                },
              ]
            : [
                {
                  accessor: "apelido",
                  title: "Apelido",
                  textAlignment: "center",
                },
                { accessor: "cgc", title: "CPF", textAlignment: "center" },
              ]
        }
        rowContextMenu={
          isMobile
            ? {
                trigger: "click",
                items: (record) => [
                  {
                    key: "Detalhar",
                    onClick: () => navigate(`/cliente/fisico/${record._id}`),
                  },
                  {
                    key: "Editar",
                    onClick: () =>
                      navigate(`/cliente/editar/fisico/${record._id}`),
                  },
                  {
                    key: "Exportar",
                    onClick: () => window.open(`/pdf/${record._id}`),
                  },
                  {
                    key: "Excluir",
                    onClick: () => abreDialogDeExclusao(record),
                  },
                ],
              }
            : undefined
        }
        noRecordsText="Nenhum registro encontrado!"
      />
      <BotaoAdicionar Tipo="F" />
    </div>
  );
}

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
import listaClientesJ from "../../services/client/listaClientesJ";

export default function Juridica() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 50em)");

  const [searchFantasia, setSearchFantasia] = useState("");
  const [debouncedSeachValue] = useDebouncedValue(searchFantasia, 500);

  const { data, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["clienteID", debouncedSeachValue],
    queryFn: async () =>
      listaClientesJ({ fantasia: debouncedSeachValue || undefined }),
  });

  const abreDialogDeExclusao = (data: Clientes) =>
    modals.openConfirmModal({
      title: "Exclusão",
      children: (
        <Text size="sm">
          Tem certeza em excluir o cliente de CNPJ {data.cgc}?
        </Text>
      ),
      labels: { confirm: "Confirmar Exclusão", cancel: "Cancelar" },
      onConfirm: () => exclui(data._id),
    });

  const exclui = async (id: string) => {
    try {
      await deleteClient(id);
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
        placeholder="Encontre o cliente pelo nome fantasia"
        value={searchFantasia}
        onChange={(event) => setSearchFantasia(event.currentTarget.value)}
      />
      <DataTable
        minHeight={132}
        withBorder
        shadow="sm"
        striped
        highlightOnHover
        horizontalSpacing="xs"
        verticalAlignment="center"
        records={data || []}
        fetching={isFetching || isRefetching}
        idAccessor="_id"
        columns={
          !isMobile
            ? [
                {
                  accessor: "fantasia",
                  title: "Fantasia",
                  textAlignment: "center",
                },
                {
                  accessor: "razaosocial",
                  title: "Razão Social",
                  textAlignment: "center",
                },
                { accessor: "cgc", title: "CNPJ", textAlignment: "center" },
                {
                  accessor: "telefone",
                  title: "Tell",
                  textAlignment: "center",
                },
                { accessor: "email", title: "E-mail", textAlignment: "center" },
                {
                  accessor: "acoes",
                  title: "Ações",
                  textAlignment: "right",
                  render: (data) => (
                    <Acoes
                      acaoDetalhar={() =>
                        navigate(`/cliente/juridico/${data._id}`)
                      }
                      acaoEditar={() =>
                        navigate(`/cliente/editar/juridico/${data._id}`)
                      }
                      acaoExportar={() => window.open(`/pdf/${data._id}`)}
                      acaoExcluir={() => abreDialogDeExclusao(data)}
                    />
                  ),
                },
              ]
            : [
                {
                  accessor: "fantasia",
                  title: "Fantasia",
                  textAlignment: "center",
                },
                { accessor: "cgc", title: "CNPJ", textAlignment: "center" },
              ]
        }
        rowContextMenu={
          isMobile
            ? {
                trigger: "click",
                items: (record) => [
                  {
                    key: "Detalhar",
                    onClick: () => navigate(`/cliente/juridico/${record._id}`),
                  },
                  {
                    key: "Editar",
                    onClick: () =>
                      navigate(`/cliente/editar/juridico/${record._id}`),
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
      <BotaoAdicionar Tipo="J" />
    </div>
  );
}

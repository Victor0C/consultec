import { Button, Card, Flex, Text, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ModalCadCertificado from "../../components/Certificado/ModalCadCertificado";
import ModalEditCertificado from "../../components/Certificado/ModalEditCertificado";
import { Certificado } from "../../services/certificado/Certificado";
import deletaCertificado from "../../services/certificado/deletaCertificado";
import listaCertificadoById from "../../services/certificado/listaCertificadoById";
import ModalSenhaCertificado from "./ModalSenhaCertificado";
import style from "./certificado.module.css";

interface PropsData {
  id: string;
  tipopessoa?: string;
}

export default function Certificados(props: PropsData) {
  const { id } = useParams() as { id: string };
  const [searchCertificado, setSearchCertificado] = useState("");
  const [debouncedSeachValue] = useDebouncedValue(searchCertificado, 500);

  const {
    data: certificados,
    isFetching,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["certificados", debouncedSeachValue],
    queryFn: async () => listaCertificadoById({id: props.id, nome: debouncedSeachValue || undefined})
  });

  const atualizaDados = () => {
    refetch();
  };

  const mostraSenha = (certificados: Certificado) => {
    modals.open({
      title: `Senha de ${certificados.nome}`,
      children: (
        <ModalSenhaCertificado senha={certificados.senha} />
      ),
    });
  };

  const AbreModalCadastrarCertificado = () => {
    modals.open({
      title: "Cadastrar certificado",
      children: (
        <ModalCadCertificado
          idCliente={id}
          close={modals.closeAll}
          onSuccess={atualizaDados}
        />
      ),
    });
  };

  const AbreModalEditCertificado = (certificados: Certificado) =>
    modals.open({
      title: "Editar certificado",
      children: (
        <ModalEditCertificado
          certificado={certificados}
          close={modals.closeAll}
          onSuccess={atualizaDados}
        />
      ),
    });

  const excluirCertificado = (certificado: Certificado) =>
    modals.openConfirmModal({
      title: "Exclusão",
      children: (
        <Text size="sm">
          Você está prestes a excluir o certificado "{certificado.nome}". Tem
          certeza disso?
        </Text>
      ),
      labels: { confirm: "Confirmar Exclusão", cancel: "Cancelar" },
      onConfirm: () => exclui(certificado._id),
    });

  const exclui = async (_id: string) => {
    try {
      await deletaCertificado(_id);
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
    <Flex direction="column">
      <Title order={2} mb="xs" align="center" className={style.titulo}>
        Certificados
      </Title>
      <Flex className={style.certificadosTable} direction="column">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.certificadosTable}
        >
          <TextInput
            icon={<BiSearchAlt />}
            mb={10}
            placeholder="Encontre o certificado pelo nome"
            value={searchCertificado}
            onChange={(event) => setSearchCertificado(event.currentTarget.value)}
          />
          <DataTable
            height={props.tipopessoa === 'F' ? 253 : 286.9}
            striped
            highlightOnHover
            horizontalSpacing="xl"
            verticalAlignment="center"
            className={style.certificadosTable}
            fetching={isFetching || isRefetching}
            records={certificados || []}
            idAccessor="_id"
            columns={[
              { accessor: "nome", title: "Nome", textAlignment: "center" },
              {
                accessor: "descricao",
                title: "Descrição",
                textAlignment: "center",
              },
              {
                accessor: "dtvalidade",
                title: "Validade",
                textAlignment: "center",
              },
            ]}
            noRecordsText="Nenhum registro encontrado!"
            rowContextMenu={{
              trigger: "click",
              items: (record) => [
                {
                  key: "Mostra senha",
                  onClick: () => mostraSenha(record),
                },
                {
                  key: "editar",
                  onClick: () => AbreModalEditCertificado(record),
                },
                {
                  key: "excluir",
                  onClick: () => excluirCertificado(record),
                },
                
              ],
            }}
          />
        </Card>
        <Flex justify="flex-end" mt="xs">
          <Button
            className="botao"
            onClick={() => {
              AbreModalCadastrarCertificado();
            }}
          >
            +
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

import { Button, Flex, SimpleGrid, Text, TextInput } from "@mantine/core";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import ModalCadAtalhos from "../../components/Atalhos/ModalCadAtalhos";
import ModalEditAtalhos from "../../components/Atalhos/ModalEditAtalhos";
import Cards from "../../components/Cards/Cards";
import { Atalho } from "../../services/Atalhos/Atalho";
import listaAtalhos from "../../services/Atalhos/ListaAtalhos";
import deletaAtalho from "../../services/Atalhos/deletaAtalho";
import style from "./Atalhos.module.css";

export default function Atalhos() {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [searchAtalho, setSearchAtalho] = useState("");
  const [debouncedSeachValue] = useDebouncedValue(searchAtalho, 500);

  const { data, refetch } = useQuery({
    queryKey: ["Atalhos", debouncedSeachValue],
    queryFn: async () =>
      listaAtalhos({ nome: debouncedSeachValue || undefined }),
  });

  const atualizaDados = () => {
    refetch();
  };

  const navegar = (url: string, nome: string) => {
    modals.openConfirmModal({
      title: "Navegação",
      children: (
        <Text size="sm">Tem certeza que deseja navegar até {nome}?</Text>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => window.open(url),
    });
  };

  const abreDialogDeExclusao = (id: string, nome: string) =>
    modals.openConfirmModal({
      title: "Exclusão",
      children: <Text size="sm">Tem certeza em excluir o atalho {nome}?</Text>,
      labels: { confirm: "Confirmar Exclusão", cancel: "Cancelar" },
      onConfirm: () => exclui(id),
    });

  const edita = (infoAtalho: Atalho) => {
    modals.open({
      title: "Cadastrar site",
      children: (
        <ModalEditAtalhos
          atalho={infoAtalho}
          close={modals.closeAll}
          onSuccess={atualizaDados}
        />
      ),
    });
  };
  const exclui = async (id: string) => {
    try {
      await deletaAtalho(id);
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
        placeholder="Encontre o atalho pelo nome"
        value={searchAtalho}
        onChange={(event) => setSearchAtalho(event.currentTarget.value)}
      />
      <Flex justify="center">
        <SimpleGrid
          cols={isMobile ? 12 : 4}
          mt="md"
          spacing="xl"
          verticalSpacing="xl"
          breakpoints={[
            { maxWidth: "161rem", cols: 6, spacing: "md" },
            { maxWidth: "160rem", cols: 4, spacing: "md" },
            { maxWidth: "95rem", cols: 3, spacing: "md" },
            { maxWidth: "62rem", cols: 2, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {data?.map((item) => (
            <Cards
              key={item._id}
              nome={item.nome}
              descricao={item.descricao}
              url={item.url}
              acaoDetalhar={() => navegar(`${item.url}`, `${item.nome}`)}
              acaoEditar={() => edita(item)}
              acaoExcluir={() =>
                abreDialogDeExclusao(`${item._id}`, `${item.nome}`)
              }
            />
          ))}
        </SimpleGrid>
      </Flex>
      <Button
        className={style.botao}
        onClick={() => {
          modals.open({
            title: "Cadastrar site",
            children: (
              <ModalCadAtalhos
                close={modals.closeAll}
                onSuccess={atualizaDados}
              />
            ),
          });
        }}
      >
        +
      </Button>
    </div>
  );
}

import { Button, Flex, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from "@mantine/form";
import { Atalho } from '../../services/Atalhos/Atalho';
import { AxiosError } from "axios";
import cadastraAtalho from '../../services/Atalhos/CadastraAtalho';
import { showNotification } from "@mantine/notifications";

interface ModalCadastra {
    close: () => void;
    onSuccess: () => void;
  }

export default function ModalCadAtalhos (props: ModalCadastra){

    const userID = JSON.parse(`${localStorage.getItem('@consultech/auth')}`).state.user_id

    const form = useForm({
        initialValues: {
          nome: "",
          url: "",
          descricao: "",
          idcontador: userID
        },
        validate: {
          nome: isNotEmpty("O campo de nome não pode ser vazio"),
          url: isNotEmpty("O campo de URLnão pode ser vazio"),
          descricao: isNotEmpty("O campo de descrição não pode ser vazio"),
        },
      });

      const cadastra = async (atalho: Omit<Atalho, "_id">) => {
        try {
          await cadastraAtalho(atalho);
    
          props.close();
          props.onSuccess();
    
          form.reset();
    
          showNotification({
            title: "Ok",
            message: "Cadastro efetuado com sucesso!",
            color: "green",
          });
        } catch (error) {
          const message =
            error instanceof AxiosError
              ? error?.response?.data?.message
              : "Ocorreu um erro ao cadastrar. Por favor, tente novamente";
          showNotification({
            title: "Erro",
            message,
            color: "red",
          });
        }
      };
 
      return (
        <div>
      <form onSubmit={form.onSubmit(cadastra)} >
        <Flex gap="xs" direction="column">
          <TextInput
            label="Nome"
            size="sm"
            placeholder="Nome do atalho"
            {...form.getInputProps("nome")}
          />
          <TextInput
            label="URL"
            size="sm"
            placeholder="URl do link"
            {...form.getInputProps("url")}
          />
          <TextInput
            label="Descrição"
            size="sm"
            placeholder="Descrição do atalho"
            {...form.getInputProps("descricao")}
          />
        </Flex>
        <Button
          className="botao"
          fullWidth
          size="sm"
          mt="xs"
          onClick={close}
          type="submit"
        >
          Adicionar
        </Button>
      </form>
    </div>
      )
}
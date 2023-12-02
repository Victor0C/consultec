import { Button, Flex, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { Atalho } from '../../services/Atalhos/Atalho';
import editaAtalho from '../../services/Atalhos/editaAtalhos';

interface ModalEditaAtalho {
    atalho: Atalho;
    close: () => void;
    onSuccess: () => void;
  }

export default function ModalEditAtalhos (props: ModalEditaAtalho){

    const userID = JSON.parse(`${localStorage.getItem('@consultech/auth')}`).state.user_id

    const form = useForm({
        initialValues: {
          nome: props.atalho.nome,
          url: props.atalho.url,
          descricao: props.atalho.descricao,
          idcontador: userID
        },
        validate: {
          nome: isNotEmpty("O campo de nome não pode ser vazio"),
          url: isNotEmpty("O campo de URLnão pode ser vazio"),
          descricao: isNotEmpty("O campo de descrição não pode ser vazio"),
        },
      });

      const edita = async (
        atalho: Omit<Atalho, "_id" | "idcontador" >
      ) => {
        try {
          await editaAtalho(props.atalho._id, atalho);
    
          props.onSuccess();
    
          showNotification({
            title: "Ok",
            message: "Registro alterado com sucesso!",
            color: "green",
          });
    
          props.close();
        } catch (error) {
          const message =
            error instanceof AxiosError
              ? error?.response?.data?.message
              : "Ocorreu um erro ao editar. Por favor, tente novamente";
          showNotification({
            title: "Erro",
            message,
            color: "red",
          });
        }
      };
 
      return (
        <div>
      <form onSubmit={form.onSubmit(edita)} >
        <Flex gap="xs" direction="column">
          <TextInput
            label="Nome"
            size="sm"
            placeholder="Nome do site"
            {...form.getInputProps("nome")}
          />
          <TextInput
            label="URL"
            size="sm"
            placeholder="URl do certificado"
            {...form.getInputProps("url")}
          />
          <TextInput
            label="Descrição"
            size="sm"
            placeholder="Descrição do site"
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
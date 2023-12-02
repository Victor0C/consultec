import { Button, Flex, InputBase, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import cadastraFuncionario from "../../services/funcionarios/cadastraFuncionario";
import { useEffect, useState } from "react";
import { IMaskInput } from 'react-imask';

interface ModalCadastra {
  idCliente: string;
  cgc?: string;
  close: () => void;
  onSuccess: () => void;
}


export default function ModalCadFuncionarios(props: ModalCadastra) {
  const [searchCep, setSearchCep] = useState('');
  const [CepFormatado, setCepFormatado] = useState('');

  useEffect(() => {
    if (searchCep && searchCep.length === 8) {
      fetch(`https://viacep.com.br/ws/${searchCep}/json/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição do CEP");
          }
          return response.json();
        })
        .then((data) => {
          if (data.erro) {
            throw new Error("CEP não encontrado");
          }
          form.setFieldValue("logradouro", data.logradouro);
          form.setFieldValue("bairro", data.bairro);
          form.setFieldValue("cidade", data.localidade);
          form.setFieldValue("estado", data.uf);
          form.setFieldValue("complemento", data.complemento);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchCep]);

  const isMobile = useMediaQuery("(max-width: 50em)");

  const form = useForm({
    initialValues: {
      nome: "",
      cpf: "",
      rg: "",
      pis: "",
      mae: "",
      pai: "",
      dtnasc: "",
      telefone: "",
      cargo: "",
      funcao: "",
      logradouro: "",
      numero: "",
      cidade: "",
      bairro: "",
      complemento: "",
      estado: "",
      cep: "",
      pais: "",
      ativo: Boolean,
      data_ativo: "",
      data_inativo: "",
      idcliente: props.idCliente,
      cnpjempregador: props.cgc,
    },
    validate: {
      nome: isNotEmpty("Esse campo não pode ser vazio"),
      cpf: isNotEmpty("Esse campo não pode ser vazio"),
      rg: isNotEmpty("Esse campo não pode ser vazio"),
      pis: isNotEmpty("Esse campo não pode ser vazio"),
      mae: isNotEmpty("Esse campo não pode ser vazio"),
      pai: isNotEmpty("Esse campo não pode ser vazio"),
      dtnasc: isNotEmpty("Esse campo não pode ser vazio"),
      telefone: isNotEmpty("Esse campo não pode ser vazio"),
      cargo: isNotEmpty("Esse campo não pode ser vazio"),
      funcao: isNotEmpty("Esse campo não pode ser vazio"),
      logradouro: isNotEmpty("Esse campo não pode ser vazio"),
      numero: isNotEmpty("Esse campo não pode ser vazio"),
      bairro: isNotEmpty("Esse campo não pode ser vazio"),
      cidade: isNotEmpty("Esse campo não pode ser vazio"),
      estado: isNotEmpty("Esse campo não pode ser vazio"),
      cep: isNotEmpty("Esse campo não pode ser vazio"),
      pais: isNotEmpty("Esse campo não pode ser vazio"),
      data_ativo: isNotEmpty("Esse campo não pode ser vazio"),
    },
  });

  const cadastra = async (values: any) => {
    values.cep = CepFormatado;
    try {
      values.data_inativo ? (values.ativo = false) : (values.ativo = true);

      await cadastraFuncionario(values);

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
      <form onSubmit={form.onSubmit((values) => cadastra(values))}>
        <Flex
          gap="xs"
          wrap="wrap"
          justify="space-around"
          direction={isMobile ? "column" : "row"}
        >
          <TextInput
            label="Nome"
            size="sm"
            placeholder="Informe o nome"
            {...form.getInputProps("nome")}
          />

          <InputBase
            label="CPF"
            component={IMaskInput}
            mask="000.000.000-00"
            size="sm"
            placeholder="000.000.000-00"
            {...form.getInputProps("cpf")}
          />

          <InputBase
            label="RG"
            component={IMaskInput}
            mask="00.000.000-00"
            size="sm"
            placeholder="00.000.000-00"
            {...form.getInputProps("rg")}
          />

          <InputBase
            label="PIS"
            component={IMaskInput}
            mask="000.00000.00-0"
            size="sm"
            placeholder="000.00000.00-0"
            {...form.getInputProps("pis")}
          />

          <TextInput
            label="Mãe"
            size="sm"
            placeholder="Informe o nome da mãe"
            {...form.getInputProps("mae")}
          />

          <TextInput
            label="Pai"
            size="sm"
            placeholder="Informe o nome do pai"
            {...form.getInputProps("pai")}
          />

          <InputBase
            label="Nascimento"
            component={IMaskInput}
              mask="00/00/0000"
            size="sm"
            placeholder="00/00/0000"
            {...form.getInputProps("dtnasc")}
          />

          <InputBase
            label="Telefone"
            component={IMaskInput}
            mask="+00 (00) 00000-0000"
            size="sm"
            placeholder="+00 (00) 00000-0000"
            {...form.getInputProps("telefone")}
          />

          <TextInput
            label="Cargo"
            size="sm"
            placeholder="Informe o cargo"
            {...form.getInputProps("cargo")}
          />

          <TextInput
            label="Função"
            size="sm"
            placeholder="Informe a função"
            {...form.getInputProps("funcao")}
          />

          <InputBase
            label="CEP"
            component={IMaskInput}
            mask="48750-000"
            size="sm"
            placeholder="Informe o CEP"
            {...form.getInputProps("cep")}
            value={searchCep}
            onChange={(event) =>{
              setSearchCep(event.currentTarget.value.replace(/-/g, ""))
            }
            }
            onBlur={(event) => {
              setCepFormatado(event.currentTarget.value)
              console.log(CepFormatado)
              form.values.cep = CepFormatado;
            }}
          />
          <TextInput
            label="Logradouro"
            size="sm"
            placeholder="Informe o logradouro"
            {...form.getInputProps("logradouro")}
          />

          <TextInput
            label="Bairro"
            size="sm"
            placeholder="Informe o bairro"
            {...form.getInputProps("bairro")}
          />

          <TextInput
            label="Número"
            size="sm"
            placeholder="Informe o número"
            {...form.getInputProps("numero")}
          />

          <TextInput
            label="Complemento"
            size="sm"
            placeholder="Informe o complemento"
            {...form.getInputProps("complemento")}
          />

          <TextInput
            label="Cidade"
            size="sm"
            placeholder="Informe a cidade"
            {...form.getInputProps("cidade")}
          />

          <TextInput
            label="Estado"
            size="sm"
            placeholder="Informe o estado"
            {...form.getInputProps("estado")}
          />

          <TextInput
            label="País"
            size="sm"
            placeholder="Informe o país"
            {...form.getInputProps("pais")}
          />

          <InputBase
            label="Data de ativação"
            component={IMaskInput}
            mask="00/00/0000"
            size="sm"
            placeholder="00/00/0000"
            {...form.getInputProps("data_ativo")}
          />

          <InputBase
            label=" Data de inativação"
            component={IMaskInput}
            mask="00/00/0000"
            size="sm"
            placeholder="00/00/0000"
            {...form.getInputProps("data_inativo")}
          />

          <Button className="botao" fullWidth size="sm" mt="xl" type="submit">
            Adicionar
          </Button>
        </Flex>
      </form>
    </div>
  );
}

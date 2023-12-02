import { Button, Flex, InputBase, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import editaFuncionario from "../../services/funcionarios/editarFuncionario";
import { IMaskInput } from "react-imask";
import { useEffect, useState } from "react";
interface ModalEdita {
  funcionario: {
    _id: string;
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
    bairro: string;
    complemento: string;
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
  idCliente: string;
  cgc?: string;
  close: () => void;
  onSuccess: () => void;
}

export default function ModaleEditFuncionario(props: ModalEdita) {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [searchCep, setSearchCep] = useState(`${props.funcionario.cep}`);
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

  const form = useForm({
    initialValues: {
      _id: props.funcionario._id,
      nome: props.funcionario.nome,
      cpf: props.funcionario.cpf,
      rg: props.funcionario.rg,
      pis: props.funcionario.pis,
      mae: props.funcionario.mae,
      pai: props.funcionario.pai,
      dtnasc: props.funcionario.dtnasc,
      telefone: props.funcionario.telefone,
      cargo: props.funcionario.cargo,
      funcao: props.funcionario.funcao,
      logradouro: props.funcionario.logradouro,
      bairro: props.funcionario.bairro,
      complemento: props.funcionario.complemento,
      numero: props.funcionario.numero,
      cidade: props.funcionario.cidade,
      estado: props.funcionario.estado,
      cep: props.funcionario.cep,
      pais: props.funcionario.pais,
      ativo: props.funcionario.ativo,
      data_ativo: props.funcionario.data_ativo,
      data_inativo: props.funcionario.data_inativo,
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
      bairro: isNotEmpty("Esse campo não pode ser vazio"),
      numero: isNotEmpty("Esse campo não pode ser vazio"),
      cidade: isNotEmpty("Esse campo não pode ser vazio"),
      estado: isNotEmpty("Esse campo não pode ser vazio"),
      cep: isNotEmpty("Esse campo não pode ser vazio"),
      pais: isNotEmpty("Esse campo não pode ser vazio"),
      data_ativo: isNotEmpty("Esse campo não pode ser vazio"),
    },
  });

  const edita = async (values: any) => {
    values.cep = CepFormatado;

    try {
      values.data_inativo ? (values.ativo = false) : (values.ativo = true);

      await editaFuncionario(values);

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
      <form onSubmit={form.onSubmit((values) => edita(values))}>
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
            placeholder="000.000.000-00"
            size="sm"
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
            placeholder="00/00/0000"
            {...form.getInputProps("dtnasc")}
          />

          <InputBase
            label="Telefone"
            component={IMaskInput}
            mask="+00 (00) 00000-0000"
            size="sm"
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
            onChange={(event) => {
              setSearchCep(event.currentTarget.value.replace(/-/g, ""));
            }}
            onBlur={(event) => {
              setCepFormatado(event.currentTarget.value);
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

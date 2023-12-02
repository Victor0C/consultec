import {
  Button,
  Flex,
  InputBase,
  SimpleGrid,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate, useParams } from "react-router-dom";
import { Clientes } from "../../services/client/Clientes";
import editaCliente from "../../services/client/editaCliente";
import listaClienteById from "../../services/client/listaClienteById";
import style from "./Cadastro.module.css";

export default function EditarClienteFisico() {
  const { id } = useParams() as { id: string };

  const { data: Client } = useQuery({
    queryKey: ["EditClientF"],
    queryFn: async () => listaClienteById(id),
  });

  const [searchCep, setSearchCep] = useState(`${Client?.cep}`);
  const [CepFormatado, setCepFormatado] = useState(`${Client?.cep}`);
  const [contrato, setContrato] = useState(Boolean);
  const [planoFiscal, setplanoFiscal] = useState(Boolean);
  const [planoContabil, setplanoContabil] = useState(Boolean);
  const [planoPessoal, setplanoPessoal] = useState(Boolean);

  useEffect(() => {
    setSearchCep(Client?.cep === undefined ? "" : Client?.cep);
  }, [Client]);

  useEffect(() => {
    const contratoEffect =
      Client?.contrato !== undefined ? Client?.contrato : false;
    const planoFiscalEffect =
      Client?.plfiscal !== undefined ? Client?.plfiscal : false;
    const planoContabilEffect =
      Client?.plcontabil !== undefined ? Client?.plcontabil : false;
    const planoPessoalEffect =
      Client?.plpessoal !== undefined ? Client?.plpessoal : false;
    setContrato(contratoEffect);
    setplanoFiscal(planoFiscalEffect);
    setplanoContabil(planoContabilEffect);
    setplanoPessoal(planoPessoalEffect);
  }, [Client]);

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

  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 50em)");

  const form = useForm({
    initialValues: {
      nomecompleto: Client?.nomecompleto || "",
      cgc: Client?.cgc || "",
      apelido: Client?.apelido || "",
      telefone: Client?.telefone || "",
      email: Client?.email || "",
      cep: Client?.cep || "",
      cidade: Client?.cidade || "",
      estado: Client?.estado || "",
      numero: Client?.numero || "",
      bairro: Client?.bairro || "",
      complemento: Client?.complemento || "",
      ramoatividade: Client?.ramoatividade || "",
      logradouro: Client?.logradouro || "",
      usursefaz: Client?.usursefaz || "",
      passsefaz: Client?.passsefaz || "",
      contrato: Client?.contrato || false,
      pais: Client?.pais || "",
      cnae: Client?.cnae || "",
      plcontabil: Client?.plcontabil || false,
      plfiscal: Client?.plfiscal || false,
      plpessoal: Client?.plpessoal || false,
      tipopessoa: "F",
    },
    validate: {
      nomecompleto: isNotEmpty("O campo de nome não pode ser vazio"),
      cgc: isNotEmpty("O campo de cgc não pode ser vazio"),
      apelido: isNotEmpty("O campo de apelido não pode ser vazio"),
      telefone: isNotEmpty("O campo de telefone não pode ser vazio"),
      email: isNotEmpty("O campo de email não pode ser vazio"),
      cidade: isNotEmpty("O campo de cidade não pode ser vazio"),
      estado: isNotEmpty("O campo de estado não pode ser vazio"),
      bairro: isNotEmpty("O campo de bairro não pode ser vazio"),
      cep: isNotEmpty("O campo de CEP não pode ser vazio"),
      numero: isNotEmpty("O campo de numero não pode ser vazio"),
      ramoatividade: isNotEmpty("O campo de atividades não pode ser vazio"),
      logradouro: isNotEmpty("O campo de logradouro não pode ser vazio"),
      usursefaz: isNotEmpty("O campo de usuario não pode ser vazio"),
      passsefaz: isNotEmpty("O campo de senha não pode ser vazio"),
      pais: isNotEmpty("O campo de país não pode ser vazio"),
      cnae: isNotEmpty("O campo de cnae não pode ser vazio"),
      complemento: isNotEmpty("O campo de complemento não pode ser vazio"),
    },
  });

  useEffect(() => {
    const values = {
      nomecompleto: Client?.nomecompleto || "",
      cgc: Client?.cgc || "",
      apelido: Client?.apelido || "",
      telefone: Client?.telefone || "",
      email: Client?.email || "",
      cep: Client?.cep || "",
      cidade: Client?.cidade || "",
      estado: Client?.estado || "",
      numero: Client?.numero || "",
      bairro: Client?.bairro || "",
      complemento: Client?.complemento || "",
      ramoatividade: Client?.ramoatividade || "",
      logradouro: Client?.logradouro || "",
      usursefaz: Client?.usursefaz || "",
      passsefaz: Client?.passsefaz || "",
      contrato: Client?.contrato || false,
      pais: Client?.pais || "",
      cnae: Client?.cnae || "",
      plcontabil: Client?.plcontabil || false,
      plfiscal: Client?.plfiscal || false,
      plpessoal: Client?.plpessoal || false,
      tipopessoa: "F",
    };
    form.setValues(values);
    form.resetDirty(values);
  }, [Client?._id]);

  const edita = async (values: Omit<Clientes, "_id">) => {
    values.cep = CepFormatado;
    form.values.contrato = contrato;
    form.values.plcontabil = planoContabil;
    form.values.plfiscal = planoFiscal;
    form.values.plpessoal = planoPessoal;
    try {
      await editaCliente(values, id);
      showNotification({
        title: "Ok",
        message: "Editado com sucesso!",
        color: "green",
      });
      form.reset();
      navigate("/fisica");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={form.onSubmit(edita)}>
        <Flex direction="column" align="center" p="xs" gap="xs">
          <SimpleGrid cols={4} spacing="xl">
            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Contrato</Text>
              <Switch
                size="sm"
                labelPosition="left"
                checked={contrato}
                onClick={() => setContrato(!contrato)}
                {...form.getInputProps("contrato")}
              />
            </Flex>
            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Pessoal</Text>
              <Switch
                size="sm"
                checked={planoPessoal}
                onClick={() => setplanoPessoal(!planoPessoal)}
                {...form.getInputProps("plpessoal")}
              />
            </Flex>

            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Contábil</Text>
              <Switch
                size="sm"
                checked={planoContabil}
                onClick={() => setplanoContabil(!planoContabil)}
                {...form.getInputProps("plcontabil")}
              />
            </Flex>

            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Fiscal</Text>

              <Switch
                checked={planoFiscal}
                onClick={() => setplanoFiscal(!planoFiscal)}
                size="sm"
                {...form.getInputProps("plfiscal")}
              />
            </Flex>
          </SimpleGrid>
          <SimpleGrid
            cols={isMobile ? 12 : 3}
            spacing="xl"
            verticalSpacing="xl"
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <TextInput
              label="Nome"
              placeholder="Informe o nome"
              className={style.inputCamp}
              {...form.getInputProps("nomecompleto")}
            />

            <TextInput
              label="Apelido"
              placeholder="Informe o apelido"
              className={style.inputCamp}
              {...form.getInputProps("apelido")}
            />
            <InputBase<any>
              label="CPF"
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="Informe o CPF"
              className={style.inputCamp}
              {...form.getInputProps("cgc")}
            />
            <InputBase
              label="Telefone"
              component={IMaskInput}
              mask="+00 (00) 00000-0000"
              placeholder="Informe o telefone"
              className={style.inputCamp}
              {...form.getInputProps("telefone")}
            />
            <TextInput
              label="E-mail"
              placeholder="Informe o e-mail"
              className={style.inputCamp}
              {...form.getInputProps("email")}
            />
            <InputBase
              label="CAEPF"
              component={IMaskInput}
              mask="00000000/0"
              placeholder="Informe o CAEPF"
              className={style.inputCamp}
              {...form.getInputProps("cnae")}
            />

            <TextInput
              label="Ramo de Atividade"
              placeholder="Informe o ramo de atividade"
              className={style.inputCamp}
              {...form.getInputProps("ramoatividade")}
            />

            <TextInput
              label="País"
              placeholder="Informe o País"
              className={style.inputCamp}
              {...form.getInputProps("pais")}
            />

            <InputBase
              label="CEP"
              component={IMaskInput}
              mask="00000-000"
              placeholder="Informe o CEP"
              className={style.inputCamp}
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
              label="Cidade"
              placeholder="Informe o cidade"
              className={style.inputCamp}
              {...form.getInputProps("cidade")}
            />

            <TextInput
              label="Logradouro"
              placeholder="Informe o logradouro"
              className={style.inputCamp}
              {...form.getInputProps("logradouro")}
            />
            <TextInput
              label="Bairro"
              placeholder="Informe o Bairro"
              className={style.inputCamp}
              {...form.getInputProps("bairro")}
            />

            <TextInput
              label="Estado"
              placeholder="Informe o estado"
              className={style.inputCamp}
              {...form.getInputProps("estado")}
            />

            <TextInput
              label="Número"
              placeholder="Informe o numero"
              className={style.inputCamp}
              {...form.getInputProps("numero")}
            />
            <TextInput
              label="Complemento"
              placeholder="Informe o complemento"
              className={style.inputCamp}
              {...form.getInputProps("complemento")}
            />

            <TextInput
              label="Usuário Sefaz"
              placeholder="Login"
              className={style.inputCamp}
              {...form.getInputProps("usursefaz")}
            />
            <TextInput
              label="Senha Sefaz"
              placeholder="Senha"
              className={style.inputCamp}
              {...form.getInputProps("passsefaz")}
            />
          </SimpleGrid>

          <Button mt="xl" className={style.salvar} type="submit">
            Salvar
          </Button>
        </Flex>
      </form>
    </div>
  );
}

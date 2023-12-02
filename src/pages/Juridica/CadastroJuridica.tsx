import {
  Button,
  Flex,
  Text,
  InputBase,
  Switch,
  TextInput,
  SimpleGrid,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { Clientes } from "../../services/client/Clientes";
import cadastraClienteJ from "../../services/client/cadastraClientesJ";
import style from "./Cadastro.module.css";

export default function CadastroJuridica() {
  const [searchCep, setSearchCep] = useState("");
  const [CepFormatado, setCepFormatado] = useState("");

  

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
      razaosocial: "",
      cgc: "",
      ie: "",
      fantasia: "",
      telefone: "",
      email: "",
      cep: "",
      cidade: "",
      estado: "",
      numero: "",
      bairro: "",
      complemento: "",
      ramoatividade: "",
      logradouro: "",
      usursefaz: "",
      passsefaz: "",
      contrato: false,
      pais: "",
      cnae: "",
      plcontabil: false,
      plfiscal: false,
      plpessoal: false,
      tipopessoa: "J",
    },
    validate: {
      razaosocial: isNotEmpty("O campo de razão social não pode ser vazio"),
      cgc: isNotEmpty("O campo de cgc não pode ser vazio"),
      ie: isNotEmpty("O campo de inscrição estadual não pode ser vazio"),
      fantasia: isNotEmpty("O campo de nome fantasia não pode ser vazio"),
      telefone: isNotEmpty("O campo de telefone não pode ser vazio"),
      email: isNotEmpty("O campo de email não pode ser vazio"),
      cidade: isNotEmpty("O campo de cidade não pode ser vazio"),
      estado: isNotEmpty("O campo de estado não pode ser vazio"),
      cep: isNotEmpty("O campo de CEP não pode ser vazio"),
      bairro: isNotEmpty("O campo de bairro não pode ser vazio"),
      numero: isNotEmpty("O campo de numero não pode ser vazio"),
      ramoatividade: isNotEmpty("O campo de atividades não pode ser vazio"),
      logradouro: isNotEmpty("O campo de logradouro não pode ser vazio"),
      usursefaz: isNotEmpty("O campo de usuario não pode ser vazio"),
      passsefaz: isNotEmpty("O campo de senha não pode ser vazio"),
      pais: isNotEmpty("O campo de país não pode ser vazio"),
      complemento: isNotEmpty("O campo de complemento não pode ser vazio"),
      cnae: isNotEmpty("O campo de cnae não pode ser vazio"),
    },
  });

  const cadastra = async (values: Omit<Clientes, "_id">) => {
    values.cep = CepFormatado;
    try {
      await cadastraClienteJ(values);
      showNotification({
        title: "Ok",
        message: "Cadastrado com sucesso!",
        color: "green",
      });
      form.reset();
      navigate("/juridica");
    } catch (error: any) {
      if (
        error.response.data.detail ===
        "Já existe um cliente com o mesmo CNPJ cadastrado."
      ) {
        showNotification({
          title: "Erro",
          message: "Já existe um cliente com o mesmo CNPJ cadastrado.",
          color: "red",
        });
      }
    }
  };
 
  return (
    <div>
      <form onSubmit={form.onSubmit(cadastra)}>
        <Flex direction="column" align="center" p="xs" gap="xl">
          <SimpleGrid cols={4} spacing="xl">
            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Contrato</Text>
              <Switch size="sm" {...form.getInputProps("contrato")} />
            </Flex>
            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Pessoal</Text>
              <Switch size="sm" {...form.getInputProps("plpessoal")} />
            </Flex>

            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Contábil</Text>
              <Switch size="sm" {...form.getInputProps("plcontabil")} />
            </Flex>

            <Flex direction="column" align="center" gap="0.2rem">
              <Text>Fiscal</Text>
              <Switch size="sm" {...form.getInputProps("plfiscal")} />
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
              label="Razão social "
              placeholder="Informe a razão social"
              className={style.inputCamp}
              {...form.getInputProps("razaosocial")}
            />

            <TextInput
              label="Nome fantasia"
              placeholder="Informe o nome fantasia"
              className={style.inputCamp}
              {...form.getInputProps("fantasia")}
            />
            <InputBase
              label="CNPJ"
              component={IMaskInput}
              mask="00.000.000/0000-00"
              placeholder="Informe o CNPJ"
              className={style.inputCamp}
              {...form.getInputProps("cgc")}
            />
            <InputBase
              label="Inscrição Estadual"
              component={IMaskInput}
              mask="00000000-0"
              placeholder="Informe a inscrição estadual"
              className={style.inputCamp}
              {...form.getInputProps("ie")}
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
              label="CNAE"
              component={IMaskInput}
              mask="000000"
              placeholder="Informe o cnae"
              className={style.inputCamp}
              {...form.getInputProps("cnae")}
            />

            <TextInput
              label="Ramo de Atividade"
              placeholder="Informe o ramo de atividade"
              className={style.inputCamp}
              {...form.getInputProps("ramoatividade")}
            />

            <InputBase
              label="CEP"
              component={IMaskInput}
              mask="00000-000"
              placeholder="Informe o CEP"
              className={style.inputCamp}
              {...form.getInputProps("cep")}
              value={searchCep}
              onChange={(event) =>{
                setSearchCep(event.currentTarget.value.replace(/-/g, ""))
                console.log(searchCep)
              }
              }
              onBlur={(event) => {
                setCepFormatado(event.currentTarget.value);
                
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
              label="País"
              placeholder="Informe o País"
              className={style.inputCamp}
              {...form.getInputProps("pais")}
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

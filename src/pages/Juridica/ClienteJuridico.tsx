import { Container, Grid, MantineProvider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Certificados from "../../components/Certificado/Certificados";
import EnderecoCliente from "../../components/EnderecoCliente";
import ListaFuncionario from "../../components/Funcionarios/ListaFuncionario";
import InfoClienteJ from "../../components/InfoClienteJ";
import listaClienteById from "../../services/client/listaClienteById";


export default function ClienteJuridico() {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const { isError, data: Client } = useQuery({
    queryKey: ["clientJ"],
    queryFn: async () => listaClienteById(id),
  });

  useEffect(() => {
    if (isError) {
      navigate("/juridica");
    }
  }, [isError, id]);

  return (
    <MantineProvider
      theme={{
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1920,
              },
            },
          },
        },
      }}
    >
      <Container size="xl">
        <Grid>
          <Grid.Col span={isMobile ? 12 : 6}>
            <Grid>
              <Grid.Col span={isMobile ? 12 : 6}>
                <InfoClienteJ
                  Contrato={Client?.contrato}
                  Fantasia={Client?.fantasia}
                  Razaosocial={Client?.razaosocial}
                  Tel={Client?.telefone}
                  Email={Client?.email}
                  Cgc={Client?.cgc}
                  Ie={Client?.ie}
                  Ramo={Client?.ramoatividade}
                  Cnae={Client?.cnae}
                  Plcontabil={Client?.plcontabil}
                  Plfiscal={Client?.plfiscal}
                  Plpessoal={Client?.plpessoal}
                />
              </Grid.Col>
              <Grid.Col span={isMobile ? 12 : 6}>
                <EnderecoCliente
                  Logradouro={Client?.logradouro}
                  Numero={Client?.numero}
                  Bairro={Client?.bairro}
                  Cidade={Client?.cidade}
                  Estado={Client?.estado}
                  Cep={Client?.cep}
                  Pais={Client?.pais}
                  Complemento={Client?.complemento}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 6}>
            <Certificados id={id} />
          </Grid.Col>
        </Grid>

        <ListaFuncionario id={id} cgc={Client?.cgc} nome={Client?.apelido} />
      </Container>
    </MantineProvider>
  );
}

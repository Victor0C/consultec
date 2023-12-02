import { Card, Divider, Flex, Grid, Text, Title } from "@mantine/core";
import style from "../pages/Juridica/ClienteJuridico.module.css";
import Copy from "./Copy/copy";
interface InfoClienteProps {
  Contrato?: boolean;
  Fantasia?: string;
  Razaosocial?: string;
  Tel?: string;
  Email?: string;
  Cgc?: string;
  Ie?: string;
  Ramo?: string;
  Cnae?: string;
  Plcontabil?: boolean;
  Plfiscal?: boolean;
  Plpessoal?: boolean;
}
export default function InfoClienteJ(props: InfoClienteProps) {
  const planos = (
    plcontabil?: boolean,
    plfiscal?: boolean,
    plpessoal?: boolean
  ) => {
    const planosAtivos = [];
    if (plcontabil) {
      planosAtivos.push("Contábil");
    }
    if (plfiscal) {
      planosAtivos.push("Fiscal");
    }
    if (plpessoal) {
      planosAtivos.push("Pessoal");
    }
    return planosAtivos.join(", ");
  };

  const contrato = (situacao?: boolean) => {
    return situacao ? "Ativo" : "Inativo";
  };

  return (
    <div>
      <Flex direction="column">
        <Title order={2} mb="xs" align="center" className={style.titulo}>
          Informações
        </Title>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="cards">
          <Flex gap="xs" className={style.informacoes}>
            <Text className={style.destaque}>Contrato:</Text>
            <Text>{`${contrato(props.Contrato)}`}</Text>
          </Flex>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Fantasia:</Text>
                <Text
                  className={style.conteudo}
                  truncate
                  title={props.Fantasia}
                >
                  {props.Fantasia}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Fantasia} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Razão Social:</Text>
                <Text truncate title={props.Razaosocial}>
                  {props.Razaosocial}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Razaosocial} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Telefone:</Text>
                <Text truncate title={props.Tel}>
                  {props.Tel}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Tel} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>E-mail:</Text>
                <Text truncate title={props.Email}>
                  {props.Email}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Email} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>CNPJ:</Text>
                <Text truncate title={props.Cgc}>
                  {props.Cgc}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Cgc} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>IE:</Text>
                <Text truncate title={props.Ie}>
                  {props.Ie}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Ie} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Atividade:</Text>
                <Text truncate title={props.Ramo}>
                  {props.Ramo}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Ramo} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>CNAE:</Text>
                <Text truncate title={props.Cnae}>
                  {props.Cnae}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Cnae} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Planos:</Text>
                <Text
                  truncate
                  title={`${planos(
                    props.Plcontabil,
                    props.Plfiscal,
                    props.Plpessoal
                  )}`}
                >{`${planos(
                  props.Plcontabil,
                  props.Plfiscal,
                  props.Plpessoal
                )}`}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy
                value={`${planos(
                  props.Plcontabil,
                  props.Plfiscal,
                  props.Plpessoal
                )}`}
              />
            </Grid.Col>
          </Grid>
          <Divider size="xs" />
        </Card>
      </Flex>
    </div>
  );
}

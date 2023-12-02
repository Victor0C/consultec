import { Card, Divider, Flex, Grid, Text, Title } from "@mantine/core";
import style from "../pages/Juridica/ClienteJuridico.module.css";
import Copy from "./Copy/copy";

interface EnderecoCliente {
  Logradouro?: string;
  Complemento?: string;
  Numero?: string;
  Bairro?: string;
  Cidade?: string;
  Estado?: string;
  Cep?: string;
  Pais?: string;
}
export default function EnderecoCliente(props: EnderecoCliente) {


  return (
    <Flex direction='column'className='cards' >
        <Title order={2} mb="xs" align='center' className={style.titulo}>
          Endereço
        </Title>
        <Card shadow="sm" padding="lg" radius="md" className='cards' withBorder>
          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Logradouro:</Text>
                <Text
                  className={style.conteudo}
                  truncate
                  title={props.Logradouro}
                >
                  {props.Logradouro}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Logradouro} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Número:</Text>
                <Text truncate
                  title={props.Numero}>{props.Numero}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Numero} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Bairro:</Text>
                <Text truncate
                  title={props.Bairro}>{props.Bairro}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Bairro} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Cidade:</Text>
                <Text truncate
                  title={props.Cidade}>{props.Cidade}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Cidade} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Complemento:</Text>
                <Text truncate
                  title={props.Complemento}>{props.Complemento}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Complemento} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>Estado:</Text>
                <Text truncate
                  title={props.Estado}>{props.Estado}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Estado} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>CEP:</Text>
                <Text truncate
                  title={props.Cep}>{props.Cep}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Cep} />
            </Grid.Col>
          </Grid>

          <Divider size="xs" />

          <Grid align="baseline">
            <Grid.Col span={10}>
              <Flex gap="xs" className={style.informacoes}>
                <Text className={style.destaque}>País:</Text>
                <Text truncate
                  title={props.Pais}>{props.Pais}</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={1} ml="lg">
              <Copy value={props.Pais} />
            </Grid.Col>
          </Grid>
          <Divider size="xs" />
        </Card>
    </Flex>
  );
}
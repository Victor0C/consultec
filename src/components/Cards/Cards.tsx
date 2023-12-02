import { Button, Card, Group, Text } from "@mantine/core";
import Acoes from "../Acoes";
import styles from "./Cards.module.css";

interface Props {
  nome: string | undefined;
  descricao: string | undefined;
  url: string | undefined;
  acaoDetalhar?: () => void;
  acaoEditar?: () => void;
  acaoExcluir?: () => void;
}

export default function Cards(props: Props) {
  return (
    <Card
      shadow="sm"
      pt="xs"
      pb='xl'
      px="md"
      radius="md"
      className={styles.card}
    >
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.nome}</Text>
        <Acoes acaoEditar={props.acaoEditar} acaoExcluir={props.acaoExcluir} />
      </Group>

      <Text truncate size="sm" color="dimmed" title={props.descricao}>
        {props.descricao}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={props.acaoDetalhar}
      >
        Navegar
      </Button>
    </Card>
  );
}

import { Text } from "@mantine/core";

export default function ModalSenhaCertificado(props: { senha?: string }) {
  return <Text align="center" size='xl' fw={700}>{props.senha}</Text>;
}

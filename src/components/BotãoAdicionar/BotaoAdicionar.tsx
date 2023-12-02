import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import style from "./BotaoAdicionar.module.css";

interface TipoCliente {
  Tipo: "J" | "F";
}

const rota = (tipo: string) => {
  if (tipo === "J") {
    return "/cadastro/juridica";
  }
  if (tipo === "F") {
    return "/cadastro/fisica";
  }
};

export default function BotaoAdicionar(props: TipoCliente) {
  const navigate = useNavigate();

  return (
    <Button
      className={style.botao}
      onClick={() => {
        navigate(`${rota(props.Tipo)}`);
      }}
    >
      +
    </Button>
  );
}

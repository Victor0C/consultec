import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { MdOutlineContentCopy } from "react-icons/md";
import style from './copy.module.css';

interface CopyProps {
    value?: string;
}
export default function Copy(props: CopyProps) {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    
      <MdOutlineContentCopy
        className={style.copy}
        onClick={() => {
          showNotification({
            title: "Ok",
            message: "Copiado!",
            color: "green",
          });
          clipboard.copy(props.value);
        }
      }
      />
  );
}

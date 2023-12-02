import api from "../api";

const deletaAtalho = async (id: string) => {
  await api.delete(`/urls/${id}`);
};

export default deletaAtalho;

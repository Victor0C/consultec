import api from "../api";

const deleteFuncionario = async (id: string) => {
  await api.delete(`/employees/${id}`);
};

export default deleteFuncionario;

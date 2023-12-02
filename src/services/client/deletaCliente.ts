import api from "../api";

const deleteClient = async (id: string) => {
  await api.delete(`/client/${id}`);
};

export default deleteClient;

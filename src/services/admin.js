import api from "configs/api";

const addCategory = async (data) => await api.post("category", data);

export { addCategory };

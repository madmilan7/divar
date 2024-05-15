import api from "configs/api";

const addCategory = async (data) => await api.post("category", data);

const getCategory = async () => await api.get("category");

export { addCategory, getCategory };

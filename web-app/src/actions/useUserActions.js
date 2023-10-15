import { fetchWrapper } from "../utils/fetchWrapper";

export const getUsers = async (query = URLSearchParams) => {
  return await fetchWrapper.get("/user?" + query);
};

export const createUser = async (body) => {
  return await fetchWrapper.post("/user", body);
};

export const editUser = async (body) => {
  return await fetchWrapper.patch("/user/" + body._id, body);
};

export const deleteUser = async (id) => {
  return await fetchWrapper.del("/user/" + id);
};

import http from "./http";
const createUser = (data) =>
  http.post("http://localhost:5000/api/register", data);
const loginUser = (data) => http.post("http://localhost:5000/api/auth", data);

const userApi = { createUser, loginUser };
export default userApi;

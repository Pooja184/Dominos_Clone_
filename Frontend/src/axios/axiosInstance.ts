import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // allow cookies (JWT)
});

export default api;

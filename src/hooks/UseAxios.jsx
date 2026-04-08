import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://concurrent-banking-transaction-system.onrender.com",
});

export default axiosInstance;
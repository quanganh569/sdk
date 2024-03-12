import axios from "axios";
import BASE_URL from "./constants";

const apiCall = axios.create({
  baseURL: `${BASE_URL}`,
});

apiCall.interceptors.response.use(
  (response: { data: any }) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export { BASE_URL };
export default apiCall;

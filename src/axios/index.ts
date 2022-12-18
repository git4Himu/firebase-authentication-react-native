import axios from "axios";
import environment from "../configuration/environment";

const Axios = axios.create({
  baseURL: environment.baseUrl,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
export default Axios;

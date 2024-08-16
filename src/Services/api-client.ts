import axios from "axios";
import { CanceledError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
export default axios.create({ baseURL})
export {CanceledError}
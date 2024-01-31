import axios from "axios";
import { HASHNODE_ENDPOINT } from "../constants";

const api = axios.create({
  baseURL: HASHNODE_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${process.env.HASHNODE_KEY}`,
  },
});

export { api };

import axios from "axios";
import { HASHNODE_ENDPOINT } from "../constants";

const api = axios.create({
  url: HASHNODE_ENDPOINT,
  headers: { Authorization: `${process.env.HASHNODE_KEY}` },
});

export { api };

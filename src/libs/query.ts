import axios from "axios";
import { MyPublications, Me, searchPublication } from "./api";

const HASHNODE_API = "https://gql.hashnode.com/";

export const queryMe = async (hashnodeKey: string) => {
  const token = hashnodeKey;

  if (!token) {
    console.log("token not found");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  try {
    const {
      data: { data },
    } = await axios({
      url: HASHNODE_API,
      method: "post",
      data: Me,
      headers: headers,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const queryPublication = async (hashnodeKey: string) => {
  const token = hashnodeKey;

  if (!token) {
    console.log("token not found");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  try {
    const {
      data: { data },
    } = await axios({
      url: HASHNODE_API,
      method: "post",
      data: MyPublications,
      headers: headers,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const findPublication = async (hashnodeKey: string, host: string) => {
  const token = hashnodeKey;

  if (!token) {
    console.log("token not found");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  try {
    const data = await axios({
      url: HASHNODE_API,
      method: "post",
      data: searchPublication({ host }),
      headers: headers,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";
import { HASHNODE_ENDPOINT } from "../constants";
import { MyPublications } from "../libs/api";

export const findPublication = async () => {
  // fetch from owner user 1st or option to publish on host address
  const hashnode_key = "bcd8acf8-7450-4415-91db-6047d2e99da9";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${hashnode_key}`,
  };

  try {
    const { data } = await axios({
      url: HASHNODE_ENDPOINT,
      method: "post",
      data: MyPublications(),
      headers: headers,
    });

    return data;
  } catch (error) {
    console.log("error");
    return {};
  }
};

(async () => {
  console.log(await findPublication());
})();

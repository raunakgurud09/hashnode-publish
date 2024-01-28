import axios from "axios";


const HASHNODE_API = "https://gql.hashnode.com/";

const graphqlQuery = {
  operationName: "Me",
  query: `query Me {
    me {
      id
      username
      name
    }
  }
  `,
  variables: {},
};

export const queryMe = async (hashnodeKey: string ) => {
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
      data: graphqlQuery,
      headers: headers,
    });

    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

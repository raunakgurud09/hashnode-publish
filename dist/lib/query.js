"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMe = void 0;
const axios_1 = __importDefault(require("axios"));
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
const queryMe = async (hashnodeKey) => {
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
        const { data: { data }, } = await (0, axios_1.default)({
            url: HASHNODE_API,
            method: "post",
            data: graphqlQuery,
            headers: headers,
        });
        // console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.queryMe = queryMe;

"use strict";
const axios = require("axios");
const fs = require("fs");
const endPoint = "https://gql.hashnode.com/";
const token = "*************************";
const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
};
const AllBuildingQuery = `{
  publishPost(input: $input) {
    post {
      id
      slug
      title
      subtitle
      author {
        username
      }
    }
  }
}`; // graphQl Query
const graphqlQuery = {
    operationName: "PublishPost",
    query: `mutation PublishPost($input: PublishPostInput!){
    publishPost(input: $input) {
      post {
        id
        slug
        title
        subtitle
        author {
          username
        }
      }
    }
  }`,
    variables: {
        input: {
            title: "With tags",
            contentMarkdown: "This should create a new blog post with tags",
            publicationId: "65b607b390d2cbd29afb4a47",
            tags: ["webdev", "devops"],
        },
    },
};
const PublishPostInfo = () => {
    const response = axios({
        url: endPoint,
        method: "post",
        data: graphqlQuery,
        headers: headers,
    });
    return response;
};
PublishPostInfo()
    .then((res) => {
    const { data: { data }, } = res;
    console.log(data);
    fs.writeFileSync("./data/hashnode.json", JSON.stringify({ posts: data.publishPost.post }));
}) // will return data object
    .catch((err) => console.log("err", err)); // err while fetching details

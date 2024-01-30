import axios from "axios";

const endPoint = "https://gql.hashnode.com/";

export const publishBlog = async (hashnode_key: string, article: any) => {
  // fetch from owner user 1st or option to publish on host address
  const publicationId = "65b607b390d2cbd29afb4a47";

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
        title: `${article.data.title}`,
        contentMarkdown: `${article.content}`,
        publicationId,
        tags: ["webdev"],
      },
    },
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${hashnode_key}`,
  };

  try {
    const { data } = await axios({
      url: endPoint,
      method: "post",
      data: graphqlQuery,
      headers: headers,
    });

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

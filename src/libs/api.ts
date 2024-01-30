export const Me = () => {
  return {
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
};

export const MyPublications = () => {
  return {
    operationName: "MyPublications",
    query: `query MyPublications {
      me {
        publications(first:10,filter:{roles:OWNER}) {
          edges {
            node {
              id
              title
            }
          }
        } 
      }
    }`,
    variables: {},
  };
};

export const searchPublication = ({ host }: { host: string }) => {
  return {
    operationName: "findPublication",
    query: `query findPublication($host: String!) {
      publication(host:$host){
        id
        title
      }
    }
  `,
    variables: {
      host: host,
    },
  };
};

// ******************************************************************************************* //
// *******************                     MUTATIONS                  ************************ //
// ******************************************************************************************* //

export type Ttag = {
  slug: string;
  name: string;
};

export type PublishPostProps = {
  title: string;
  markdown: string;
  publicationId: string;
  tags: [Ttag];
  publish_on?: string;
};

export const PublishPost = ({
  title,
  markdown,
  publicationId,
  tags,
  publish_on,
}: PublishPostProps) => {
  return {
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
        title,
        contentMarkdown: markdown,
        publicationId,
        tags: tags,
      },
    },
  };
};

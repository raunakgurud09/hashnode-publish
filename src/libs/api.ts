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
  contentMarkdown: string;
  publicationId: string;
  tags: Ttag[];

  coverImageOptions?: {
    coverImageURL?: string;
  };

  subtitle?: string;
  slug?: string;
  disableComments?: boolean;
  isNewsletterActivated?: boolean;

  settings?: {
    isNewsletterActivated?: boolean;
    enableTableOfContent?: boolean;
  };
};

export const PublishPost = (payload: PublishPostProps) => {
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
        ...payload,
      },
    },
  };
};

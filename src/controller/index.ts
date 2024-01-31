import axios from "axios";
import {
  MyPublications,
  PublishPost,
  PublishPostProps,
  searchPublication,
} from "../libs/api";
import { HASHNODE_ENDPOINT } from "../constants";

export const publishBlog = async (
  hashnode_key: string,
  article: any,
  host: string
): Promise<{
  data: any | null;
  error: { status_code: number | string; message: string } | null;
}> => {
  const toPublish = article.data.publish ?? false;

  // get publicationId
  const { publication, error } = await getPublicationId(host);
  if (error || !publication) {
    return { data: null, error };
  }

  // log to the publication title it's been posted on
  console.log(`blog is been posted on ${publication.title}...`);

  if (!toPublish) {
    return {
      data: {
        status_code: 200,
        message: `Title:${article.data.title} is been worked on ⚒️, Change to publish:true to publish`,
      },
      error: null,
    };
  }

  const payload: PublishPostProps = {
    contentMarkdown: article.content,
    title: article.data.title,
    publicationId: publication.id,
    tags: article.data.tags,
    subtitle: article.data.subtitle,

    coverImageOptions: {
      coverImageURL: article.data.cover_image || "",
    },

    settings: {
      enableTableOfContent: article.data.settings.enableTableOfContent || true,
      isNewsletterActivated:
        article.data.settings.isNewsletterActivated || true,
    },
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${hashnode_key}`,
  };

  try {
    const { data } = await axios({
      url: HASHNODE_ENDPOINT,
      method: "post",
      data: PublishPost(payload),
      headers: headers,
    });

    return {
      data: data,
      error: {
        status_code: 400,
        message: JSON.stringify(data),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status_code: error?.errors[0].extensions?.code,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: JSON.stringify(error?.errors[0]?.message),
      },
    };
  }
};

export const getPublicationId = async (
  host: string | undefined
): Promise<{
  publication: { id: string; title: string } | null;
  error: { status_code: number | string; message: string } | null;
}> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${process.env.HASHNODE_KEY}`,
  };

  if (host) {
    console.log(`host provided: ${host}`);
    // check permission to post
    const payload = { host };
    try {
      const {
        data: {
          data: { publication },
        },
      } = await axios({
        url: HASHNODE_ENDPOINT,
        method: "post",
        data: searchPublication(payload),
        headers: headers,
      });

      if (publication) {
        return {
          publication,
          error: null,
        };
      } else {
        return {
          publication: null,
          error: {
            status_code: 400,
            message: "invalid host. Enter a valid host",
          },
        };
      }
    } catch (error) {
      console.log("error");
      return {
        publication: null,
        error: {
          status_code: 500,
          message: "Something went wrong",
        },
      };
    }
  } else {
    console.log("host not provided");

    try {
      const {
        data: {
          data: {
            me: { publications },
          },
        },
      } = await axios({
        url: HASHNODE_ENDPOINT,
        method: "post",
        data: MyPublications(),
        headers: headers,
      });

      // fetch host address form 1sh owner blog
      const { node } = publications.edges[0];

      return {
        publication: node,
        error: null,
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log("error", error?.message);
      return {
        publication: null,
        error: {
          status_code: 500,
          message: "Something went wrong",
        },
      };
    }
  }
};

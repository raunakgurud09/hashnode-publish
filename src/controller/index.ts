import axios from "axios";
import lodash from "lodash";
import {
  MyPublications,
  PublishPost,
  PublishPostProps,
  searchPublication,
} from "../libs/api";
import { HASHNODE_ENDPOINT, hashnode_key } from "../constants";

export const publishBlog = async (
  hashnode_key: string,
  article: any,
  host: string
) => {
  const toPublish = article.data.publish ?? false;

  // get publicationId
  const { publication, error } = await getPublicationId(host);
  if (error || !publication) {
    return { error };
  }
  // log to the publication title it's been posted on
  console.log(`blog is been posted on ${publication.title}...`);

  const payload: PublishPostProps = {
    markdown: article.content,
    ...article.data,
  };

  lodash.omit(payload, ["markdown", "cover_image"]);

  console.log(payload);

  if (!toPublish) {
    return {
      message: `Title:${article.data.title} is been worked on ⚒️`,
    };
  }

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

    return data;
  } catch (error) {
    console.log(error);
    return {};
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
    Authorization: `${hashnode_key}`,
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

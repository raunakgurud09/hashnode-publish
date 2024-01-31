import { publishBlog } from "../controller";
import { parseFile } from "../utils/file";

type publishProps = {
  host: string;
  hashnode_key: string;
  file: string;
};

export const publishToHashnode = async ({
  host,
  hashnode_key,
  file,
}: publishProps) => {
  // check validity of hashnode_key

  // parse the file into content
  const article = await parseFile(file);

  // TODO: validation
  const { data, error } = await publishBlog(hashnode_key, article, host);

  if (error) {
    console.log(`error - ${error}`);
    return error;
  }

  console.log(`blog successfully posted on ${data?.publishPost?.post?.url}`);
  return data;
};

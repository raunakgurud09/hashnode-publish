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
  const publish_response = await publishBlog(hashnode_key, article, host);

  console.log("publish data", publish_response);

  // return result of publish blog
  return publish_response;
};

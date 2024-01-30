import { updateRelativeImageUrls } from "../utils/image";
import { publishBlog } from "../controller";
import { parseFile } from "../utils/file";
import { getRepoDetails } from "../utils/respo";

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

  //  get information related to repository
  const repository = getRepoDetails();

  // update the images relative path in file to github hosted image path
  const updatedArticle = updateRelativeImageUrls(article, repository, file);

  const publish = await publishBlog(hashnode_key, updatedArticle, host);
  console.log("publish data", publish);
  // return result of publish blog
  return publish;
};

import { queryMe } from "./query";
import fs from "fs-extra";
import matter from "gray-matter";

type publishProps = {
  title: string;
  hashnode_key: string;
  file: string;
};

export const publishToHashnode = async ({
  title,
  hashnode_key,
  file,
}: publishProps) => {
  console.log("op: ", { title, hashnode_key, file });

  const response = await queryMe(hashnode_key);
  if (!response) {
    return [];
  }

  const content = await fs.readFile(file, "utf8");
  const article = matter(content, { language: "yaml" });

  console.log("article",article);

  console.log(response);
  return [response];
};

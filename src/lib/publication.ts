import { Toolkit } from "actions-toolkit";
import { queryMe } from "./query";
import fs from "fs-extra";
import matter from "gray-matter";
import { updateRelativeImageUrls } from "../utils/image";

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
  const response = await queryMe(hashnode_key);
  if (!response) {
    return [];
  }

  const tools = new Toolkit();
  const { owner, repo } = tools.context.repo;
  const branch = "main";
  const repository = {
    user: owner,
    name: repo,
    branch,
  };
  // console.log(tools.context.repo);

  const content = await fs.readFile(file, "utf8");
  const article = matter(content, { language: "yaml" });

  const updatedArticle = updateRelativeImageUrls(article, repository,file);
  console.log("updated", updatedArticle);

  console.log(response);
  return [response];
};

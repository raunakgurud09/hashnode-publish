import fs from "fs-extra";
import matter from "gray-matter";
import { createTags } from "./helper";

export const parseFile = async (file: string) => {
  // path of file you want to parse
  const content = await fs.readFile(file, "utf8");
  const article = matter(content, { language: "yaml" });

  const newTags = createTags(article.data.tags);

  // time process

  return { ...article, tags: newTags };
};

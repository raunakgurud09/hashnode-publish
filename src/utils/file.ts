import fs from "fs-extra";
import matter from "gray-matter";

export const parseFile = async (file: string) => {
  // path of file you want to parse
  const content = await fs.readFile(file, "utf8");
  const article = matter(content, { language: "yaml" });

  return article;
};

import fs from "fs-extra";
import matter from "gray-matter";
import { createTags } from "./helper";
import { getRepoDetails } from "./repos";
import { updateRelativeImageUrls } from "./image";

export const parseFile = async (file: string) => {
  // path of file you want to parse
  const content = await fs.readFile(file, "utf8");
  const parsedArticle = matter(content, { language: "yaml" });

  // TODO: required check
  // title, description, publish, tags, contentMarkdown,
  // (2) publicationId

  //  get information related to repository
  const repository = getRepoDetails();

  // update the images relative path in file to github hosted image path
  const article = updateRelativeImageUrls(parsedArticle, repository, file);

  const newTags = createTags(article.data.tags);
  article.data.tags = newTags;

  // const isSchedules = !!article.data.publishedAt ?? false;

  const disableComments = article.data.disableComments ? true : false;
  article.data.disableComments = disableComments;

  const isNewsletterActivated = true;
  const enableTableOfContent = true;

  // const slug = article.data.slug ?? false;

  // const metaTags = {
  //   title: article.data.title,
  //   description: article.data.description,
  //   image: article.data.cover_image,
  // };
  // article.data.metaTags = metaTags;

  const settings = {
    // scheduled: isSchedules,
    enableTableOfContent,
    // slugOverridden: !!slug,
    isNewsletterActivated,
  };
  article.data.settings = settings;

  return { ...article };
};

import path from "node:path";
import process from "node:process";
import { createInterface } from "node:readline";
import fs from "fs-extra";
const hostUrl = "https://raw.githubusercontent.com";

const relativeImageRegex =
  /!\[(.*)]\((?!.*?:\/\/)([^ ]*?) *?( (?:'.*'|".*"))? *?\)/g;
const imageRegex = /!\[(.*)]\(([^ ]*?) *?( (?:'.*'|".*"))? *?\)/g;

export const convertPathToPosix = (path: string) => path.replace(/\\/g, "/");

const isUrl = (string: string) => /^https?:\/\/\w/.test(string);

const getResourceUrl = (repository: any, branch: string) =>
  `${hostUrl}/${repository.user}/${repository.name}/${branch}/`;

const getFullImagePath = (basePath: string, imagePath: string) =>
  convertPathToPosix(path.normalize(path.join(basePath, imagePath)));

export function updateRelativeImageUrls(
  article: any,
  repository: any,
  branch: string
) {
  const data = { ...article.data };
  let { content } = article;
  const basePath = path.dirname(article.file);
  let match;
  while ((match = relativeImageRegex.exec(article.content))) {
    const [link, alt = "", imagePath, title = ""] = match;
    if (imagePath) {
      const fullPath = getFullImagePath(basePath, imagePath);
      const newLink = `![${alt}](${getResourceUrl(repository, branch)}${fullPath}${title})`;
      content = content.replace(link, newLink);
    }
  }
  if (data.cover_image && !isUrl(data.cover_image)) {
    const fullPath = getFullImagePath(basePath, data.cover_image);
    data.cover_image = `${getResourceUrl(repository, branch)}${fullPath}`;
  }
  return { ...article, content, data };
}
export function getImageUrls(article: any) {
  const urls = [];
  let match;
  while ((match = imageRegex.exec(article.content))) {
    const url = match[2];
    if (url) {
      urls.push(url);
    }
  }
  if (article.data.cover_image) {
    urls.push(article.data.cover_image);
  }
  return urls;
}

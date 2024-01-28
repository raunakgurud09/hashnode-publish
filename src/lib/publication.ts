import { queryMe } from "./query";

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
  console.log(response);
  return [response];
};

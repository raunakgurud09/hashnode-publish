import { Toolkit } from "actions-toolkit";

export const getRepoDetails = () => {
  const tools = new Toolkit();
  const { owner, repo } = tools.context.repo;

  // TODO: find the working branch
  const branch = "main";

  return {
    // git repository username
    user: owner,
    // current repository name
    name: repo,
    // current branch name
    branch,
  };
};

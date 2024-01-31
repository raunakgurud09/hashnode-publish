import {
  getInput,
  setFailed,
  debug,
  setSecret,
  setOutput,
} from "@actions/core";
import { publishToHashnode } from "./libs/publication";
import { getUser } from "./controller";

export async function run() {
  try {
    const host = getInput("host");
    const file = getInput("file");
    const hashnode_key = getInput("hashnode_key");

    setSecret(hashnode_key);

    const response = await getUser(hashnode_key);

    console.log(response);

    if (response.error) {
      setOutput("result_json", response.data);
      const summary = `Invalid hashnode_key ${hashnode_key}`;
      setOutput("result_summary", summary);
      setOutput("result_info", response.error);

      process.exit(1);
    }

    console.log(`Welcome ${response.me.name} to this action`);
    debug(
      JSON.stringify({
        host,
        file,
        hashnode_key,
      })
    );

    // some function to analyze the post
    // give output of the post
    const result = await publishToHashnode({
      host,
      hashnode_key,
      file,
    });

    const json = JSON.stringify(result, null, 2);

    debug("Output result_json:\n" + json);
    setOutput("result_json", json);

    const summary = `output success message or failure message`;
    setOutput("result_summary", summary);

    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // Get the JSON webhook payload for the event that triggered the workflow
  } catch (error: any) {
    setFailed(error);
  }
}

run();

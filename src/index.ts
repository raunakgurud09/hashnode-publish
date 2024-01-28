import {
  getInput,
  setFailed,
  debug,
  setSecret,
  setOutput,
} from "@actions/core";
import { publishToHashnode } from "./lib/publication";

async function run() {
  try {
    const title = getInput("title");
    const file = getInput("file");
    const hashnode_key = getInput("hashnode_key");

    setSecret(hashnode_key);

    console.log("Welcome to this action");
    console.log(process.env.HASHNODE_KEY);
    debug(
      JSON.stringify({
        title,
        file,
        hashnode_key,
      })
    );

    // some function to analyze the post
    // give output of the post
    // const results = await publishToHashnode({
    //   title,
    //   hashnode_key,
    //   file,
    // });

    // const output = results.map((r: any) => {
    //   console.log("r:", r);
    //   return r;
    // });
    const output = [{}];

    const json = JSON.stringify(output, null, 2);
    debug("Output result_json:\n" + json);
    setOutput("result_json", json);

    const summary = `output length: ${output.length}`;
    setOutput("result_summary", summary);

    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // Get the JSON webhook payload for the event that triggered the workflow
  } catch (error: any) {
    setFailed(error);
  }
}

run();

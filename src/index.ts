import core from "@actions/core";
import github from "@actions/github";
import { publishToHashnode } from "./lib/publication.js";

async function run() {
  try {
    const title = core.getInput("title");
    const file = core.getInput("file");
    const hashnode_key = core.getInput("hashnode_key");

    core.setSecret(hashnode_key);

    console.log("welcome to this action");
    console.log(process.env.HASHNODE_KEY);
    core.debug(
      JSON.stringify({
        title,
        file,
        hashnode_key,
      })
    );

    // some function to analyze the post
    // give output of the post
    const results = await publishToHashnode({
      title,
      hashnode_key,
      file,
    });

    const output = results.map((r: any) => {
      console.log("r:", r);
      return r;
    });

    const json = JSON.stringify(output, null, 2);
    core.debug("Output result_json:\n" + json);
    core.setOutput("result_json", json);

    const summary = `output length: ${output.length}`;
    core.setOutput("result_summary", summary);

    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // Get the JSON webhook payload for the event that triggered the workflow
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();

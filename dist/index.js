"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const publication_js_1 = require("./lib/publication.js");
async function run() {
    try {
        const title = core_1.default.getInput("title");
        const file = core_1.default.getInput("file");
        const hashnode_key = core_1.default.getInput("hashnode_key");
        core_1.default.setSecret(hashnode_key);
        console.log("welcome to this action");
        console.log(process.env.HASHNODE_KEY);
        core_1.default.debug(JSON.stringify({
            title,
            file,
            hashnode_key,
        }));
        // some function to analyze the post
        // give output of the post
        const results = await (0, publication_js_1.publishToHashnode)({
            title,
            hashnode_key,
            file,
        });
        const output = results.map((r) => {
            console.log("r:", r);
            return r;
        });
        const json = JSON.stringify(output, null, 2);
        core_1.default.debug("Output result_json:\n" + json);
        core_1.default.setOutput("result_json", json);
        const summary = `output length: ${output.length}`;
        core_1.default.setOutput("result_summary", summary);
        // const payload = JSON.stringify(github.context.payload, undefined, 2);
        // Get the JSON webhook payload for the event that triggered the workflow
    }
    catch (error) {
        core_1.default.setFailed(error.message);
    }
}
run();

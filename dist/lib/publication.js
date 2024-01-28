"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToHashnode = void 0;
const query_js_1 = require("./query.js");
const publishToHashnode = async ({ title, hashnode_key, file, }) => {
    console.log("op: ", { title, hashnode_key, file });
    const response = await (0, query_js_1.queryMe)(hashnode_key);
    if (!response) {
        return [];
    }
    console.log(response);
    return [response];
};
exports.publishToHashnode = publishToHashnode;

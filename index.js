const fs = require("fs");

const textIn = fs.readFileSync("./txt/append.txt", "utf-8");

console.log(textIn);

const textOut = `This is what se now about avocados ${textIn}. /n created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File created");

const fs = require("fs");

const input = fs.readFileSync("../filesystem/input.txt", "utf-8");
console.log(input);

const content = `This text was generated from from the input file: ${input} \n\n created at: ${new Date()}`;
fs.writeFileSync("output.txt", content);


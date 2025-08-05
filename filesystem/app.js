const fs = require("fs");

const input = fs.readFileSync("../filesystem/input.txt", "utf-8");
console.log(input);

const content = `This text was generated from from the input file: ${input} \n\n created at: ${new Date()}`;
fs.writeFileSync("output.txt", content);

fs.readFile("../filesystem/input.txt", "utf-8", (err, data) => {
  console.log(data);
  fs.readFile(`../filesystem/${data}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.writeFile(
      "../filesystem/append.txt",
      `${data}\n${data2}\n${Date.now()}`,
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully");
        }
      }
    );
  });
});
console.log("Reading file...");

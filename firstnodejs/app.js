const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name: ", (name) => {
  console.log(`Your name is ${name}`);
  rl.close();
});

rl.on("close", () => {
  console.log("Interface closed");
  process.exit(0);
});

/* console.log(
  "Hello, i'm Zayn I just came back learning nodejs. I guess it's gonna be a great time haha"
); */

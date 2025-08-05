const http = require("http");

const server = http.createServer((request, response) => {
  response.end("Hello, i am a nodejs server, haha");
  console.log(response);
});

const PORT = 3000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is now running on port ${PORT}`);
});

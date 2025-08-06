const http = require("http");

const server = http.createServer((request, response) => {
  const path = request.url;
  if (path === "/" || path.toLowerCase() === "/home") {
    response.end("You are in home page");
  } else if (path.toLowerCase() === "/about") {
    response.end("You are in About page");
  } else if (path.toLowerCase() === "/contact") {
    response.end("You are in Contact page");
  } else {
    response.statusCode = 404;
    response.end("404 Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is now running on port ${PORT}`);
});

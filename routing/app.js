const http = require("http");
const fs = require("fs");

const html = fs.readFileSync("../routing/index.html", "utf-8");
const products = JSON.parse(fs.readFileSync("../data/product.json", "utf-8"));

const server = http.createServer((request, response) => {
  const path = request.url;
  if (path === "/" || path.toLowerCase() === "/home") {
    response.end(html.replace("{&VALUE&}", "You are in Home Page"));
  } else if (path.toLowerCase() === "/about") {
    response.end(html.replace("{&VALUE&}", "You are in About Page"));
  } else if (path.toLowerCase() === "/contact") {
    response.end(html.replace("{&VALUE&}", "You are in Contact Page"));
  } else {
    response.statusCode = 404;
    response.end(html.replace("{&VALUE&}", "Error 404: Page not found"));
  }
});

const PORT = 3000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is now running on port ${PORT}`);
});

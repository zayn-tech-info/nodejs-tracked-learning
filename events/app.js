const http = require("http");
const events = require("events");
const url = require("url");

const server = http.createServer();
const user = require('../modules/app')

server.on("request", (request, response) => {
  const { query, pathname: path } = url.parse(request.url, true);

  if (path === "/" || path.toLowerCase() === "/home") {
    response.end(html.replace("{&VALUE&}", "You are in Home Page"));
  } else if (path.toLowerCase() === "/about") {
    response.end(html.replace("{&VALUE&}", "You are in About Page"));
  } else if (path.toLowerCase() === "/contact") {
    response.end(html.replace("{&VALUE&}", "You are in Contact Page"));
  } else if (path.toLowerCase() === "/products") {
    if (!query.id) {
      const productsHtmlArray = products.map((prod) => {
        return replace(productHtml, prod);
      });
      response.end(html.replace("{&VALUE&}", productsHtmlArray.join(",")));
    } else {
      let prod = products[query.id];
      let productDetailResonse = replace(productDetailHtml, prod);
      response.end(productDetailResonse);
    }
  } else {
    response.statusCode = 404;
    response.end(html.replace("{&VALUE&}", "Error 404: Page not found"));
  }
});

const PORT = 8001;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is now running on port ${PORT}`);
});

const myEmitter = new user();

myEmitter.on("usercreated", (id, name) => {
  console.log(`A new user with the name ${name} and an id ${id} created`);
});

myEmitter.on("usercreated", (id, name) => {
  console.log(
    `A new user with the name ${name} and an id ${id} added to the database`
  );
});

myEmitter.emit("usercreated", 111, "Zayn");

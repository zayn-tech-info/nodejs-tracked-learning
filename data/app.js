const http = require("http");
const fs = require("fs");
const url = require("url");

const html = fs.readFileSync("../routing/index.html", "utf-8");
const products = JSON.parse(fs.readFileSync("../data/product.json", "utf-8"));
const productHtml = fs.readFileSync("../data/products.html", "utf-8");
const productDetailHtml = fs.readFileSync(
  "../data/product-details.html",
  "utf-8"
);

const replace = (template, prod) => {
  let output = template.replace(/{{%PRODUCTIMAGE%}}/g, prod.productImage);
  output = output.replace(/{{%NAME%}}/g, prod.name);
  output = output.replace(/{{%SCREENSIZE%}}/g, prod.screenSize);
  output = output.replace(/{{%MODELNAME%}}/g, prod.modelName);
  output = output.replace(/{{%MODELNUMBER%}}/g, prod.modelNumber);
  output = output.replace(/{{%PRICE%}}/g, prod.price);
  output = output.replace(/{{%COLOR%}}/g, prod.color);
  output = output.replace(/{{%DESCRIPTION%}}/g, prod.description);
  output = output.replace(/{{%ID%}}/g, prod.id);
  return output;
};

// (request, response) => {};
const server = http.createServer();

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
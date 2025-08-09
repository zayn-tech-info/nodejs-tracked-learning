const http = require("http");
const fs = require("fs");
const url = require("url");

const html = fs.readFileSync("../routing/index.html", "utf-8");
const products = JSON.parse(fs.readFileSync("../data/product.json", "utf-8"));
const productHtml = fs.readFileSync("../data/products.html", "utf-8");

const productHtmlArray = products.map((prod) => {
  let output = productHtml.replace("{{%IMAGE%}}", prod.productImage);
  output = output.replace("{{%MODELNAME%}}", prod.name);
  output = output.replace("{{%COLOR%}}", prod.color);
  output = output.replace("{{%PRICE%}}", prod.price);
  output = output.replace("{{%MODELNUMBER%}}", prod.modelNumber);
  output = output.replace("{{%SCREENSIZE%}}", prod.screenSize);
  output = output.replace("{{%DESCRIPTION%}}", prod.camera);
  output = output.replace("{{%PRODCTIONIMAGE%}}", prod.description);
  output = output.replace("{{%ID%}}", prod.id);
  return output;
});

const server = http.createServer((request, response) => {
  const { query, pathname: path } = url.parse(request.url, true);
  console.log(query);

  if (path === "/" || path.toLowerCase() === "/home") {
    response.end(html.replace("{&VALUE&}", "You are in Home Page"));
  } else if (path.toLowerCase() === "/about") {
    response.end(html.replace("{&VALUE&}", "You are in About Page"));
  } else if (path.toLowerCase() === "/contact") {
    response.end(html.replace("{&VALUE&}", "You are in Contact Page"));
  } else if (path.toLowerCase() === "/products") {
    if (!query.id) {
      response.end(html.replace("{&VALUE&}", productHtmlArray.join(",")));
    }else{
      response.end("This product id is = " + query.id)
    }
  } else {
    response.statusCode = 404;
    response.end(html.replace("{&VALUE&}", "Error 404: Page not found"));
  }
});

const PORT = 3000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is now running on port ${PORT}`);
});

const fs = require("fs");
const http = require("http");

const server = http.createServer();

/* server.on("request", (req, res) => {
  let rs = fs.createReadStream("../stream/index.txt");

  rs.on("data", (chunk) => {
    res.write(chunk);
  });

  rs.on("end", () => {
    res.end();
  });
  rs.on("error", (error) => {
    res.end(error.message);
  });
}); */
server.on("request", (req, res) => {
  let rs = fs.createReadStream("../stream/index.txt");
  rs.pipe(res);
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server running on prot ${PORT}`);
});

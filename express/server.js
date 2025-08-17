const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const app = require("./app");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}
app.listen(port, (req, res) => {
  console.log("Server already started...");
});

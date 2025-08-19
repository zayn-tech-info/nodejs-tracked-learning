const mongoose = require("mongoose");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

const app = require("./app");
const morgan = require("morgan");
const { type } = require("os");

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then((response) => {
    // console.log(response);
    console.log("Database connected succefully");
  })
  .catch((err) => {
    console.log("An error occured: " + err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: String,
    trim: true,
    enum: ["Electronics", "Clothing", "Food", "Other"],
    required: true,
  },
  image: {
    type: String,
    required: [true, "Please provide an image for this product"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

const Product = mongoose.model("Product", productSchema);

const testProduct = new Product({
  name: "Organic Honey Jar",
  categories: "Food",
  image: "https://example.com/images/organic-honey.jpg",
  price: 25000,
  ratings: 4.0,
});

testProduct
  .save()
  .then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.log("An error occoured : " + err);
  });

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.listen(port, (req, res) => {
  console.log("Server already started...");
});

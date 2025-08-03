const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const booksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      set: (value) => value.trim(),
    },
    author: {
      type: String,
      require: true,
      set: (value) => value.trim(),
    },
    price: {
      type: String,
      require: true,
      set: (value) => Math.round(value * 100) / 100,
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model("Book", booksSchema);

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongodb connect successfully...");

    const bookCreated = await Book.create({});
    console.log(bookCreated);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

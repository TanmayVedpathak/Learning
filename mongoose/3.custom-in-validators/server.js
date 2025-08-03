const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const userProfileSchema = mongoose.Schema(
  {
    objectId: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: [true, "Please username is required"],
      unique: true,
      minLength: 3,
      maxLength: 20,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]+$/.test(value);
        },
        message: "Username can only contain alphanumeric character",
      },
    },
    email: {
      type: String,
      required: [true, "Please email is required"],
      validate: {
        validator: function (value) {
          return /^[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            value,
          );
        },
        message: "invalid email",
      },
    },
    age: {
      type: Number,
      required: [true, "Please age is required"],
      min: 18,
      max: 60,
    },
    gender: {
      type: "String",
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userProfileSchema);

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongodb connect successfully...");

    const userCreated = await User.create({
      username: "niffler",
      email: "test@gmail.com",
      age: 18,
      gender: "Male",
    });
    console.log(userCreated);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

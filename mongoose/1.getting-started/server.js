const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const userProfileSchema = mongoose.Schema({
  objectId: mongoose.Schema.Types.ObjectId,
  username: String,
  age: Number,
  birthday: Date,
  isActive: Boolean,
  hobbies: [String],
  address: {
    street: String,
    city: String,
    postCode: Number,
  },
  customData: mongoose.Schema.Types.Mixed,
});

const User = mongoose.model("User", userProfileSchema);

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongodb connect successfully...");

    // ! --------------------------------------- crud ---------------------------------------

    // ! --------------------------------- create ---------------------------------

    // ! save()
    // const newUser = new User({
    //   username: "Jonathan",
    //   age: 26,
    //   birthday: new Date("1998- 06-25"),
    //   isActive: true,
    //   hobbies: ["Soccer", "Reading", "Singing"],
    //   address: {
    //     street: "123 Maple St",
    //     city: "New York",
    //     postCode: 10001,
    //   },
    //   customData: {
    //     country: "Armenia",
    //   },
    // });

    // newUser
    //   .save()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! create()
    // User.create({
    // username: "Nathan Lee",
    //   age: 29,
    //   birthday: new Date("1995-11-02"),
    //   isActive: true,
    //   hobbies: ["Running", "Chess", "Guitar"],
    //   address: {
    //     street: "321 Sunset Blvd",
    //     city: "Austin",
    //     postCode: 73301
    //   },
    //   customData: {
    //     country: "Australia"
    //   }
    // })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! insertMany()
    // User.insertMany([
    //   {
    //     username: "Emily Carter",
    //     age: 32,
    //     birthday: new Date("1992-03-14"),
    //     isActive: false,
    //     hobbies: ["Photography", "Hiking", "Painting"],
    //     address: {
    //       street: "456 Cedar Lane",
    //       city: "San Francisco",
    //       postCode: 94110,
    //     },
    //     customData: {
    //       country: "Canada",
    //     },
    //   },
    //   {
    //     username: "Liam Martinez",
    //     age: 28,
    //     birthday: new Date("1996-01-22"),
    //     isActive: true,
    //     hobbies: ["Gaming", "Cycling", "Cooking"],
    //     address: {
    //       street: "78 Ocean View Dr",
    //       city: "Miami",
    //       postCode: 33101,
    //     },
    //     customData: {
    //       country: "Mexico",
    //     },
    //   },
    //   {
    //     username: "Sophia Zhang",
    //     age: 24,
    //     birthday: new Date("2000-09-08"),
    //     isActive: true,
    //     hobbies: ["Writing", "Yoga", "Traveling"],
    //     address: {
    //       street: "99 Cherry Blossom Ave",
    //       city: "Seattle",
    //       postCode: 98101,
    //     },
    //     customData: {
    //       country: "Singapore",
    //     },
    //   },
    // ])
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! --------------------------------- read ---------------------------------

    // ! find()

    // User.find()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! findOne()

    // User.findOne({
    //   age: 28,
    // })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! findById()

    // User.findById("68865bcd8e1782a2a926ffa1")
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! where()
    // User.find()
    //   .where("age")
    //   .gte(28)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! sort()
    // User.find()
    //   .where("age")
    //   .gte(28)
    //   .sort({ username: -1 })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! limit()
    // User.find()
    //   .where("age")
    //   .gte(28)
    //   .limit(1)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // ! --------------------------------- update ---------------------------------

    // ! updateOne()

    // const updatedDoc = await User.updateOne(
    //   {
    //     username: "Emily Carter",
    //   },
    //   {
    //     age: 30,
    //     isActive: true,
    //   },
    //   {
    //     new: true,
    //   },
    // );

    // console.log(updatedDoc);

    // ! findByIdAndUpdate()

    // const updatedDoc = await User.findByIdAndUpdate(
    //   "688669a005c64fb9df463965",
    //   {
    //     birthday: new Date("1999-06-04"),
    //   },
    //   {
    //     new: true,
    //   },
    // );

    // console.log(updatedDoc);

    // ! findByOneAndUpdate()

    // const updatedDoc = await User.findOneAndUpdate(
    //   {
    //     username: "Sophia Zhang",
    //   },
    //   {
    //     hobbies: ["Gaming", "Anime", "Coding"],
    //   },
    //   {
    //     new: true,
    //   },
    // );

    // console.log(updatedDoc);

    // ! --------------------------------- delete ---------------------------------
  } catch (error) {
    console.log("Error:", error);
  }
};

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

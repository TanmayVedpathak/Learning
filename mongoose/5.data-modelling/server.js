const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongodb connect successfully...");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

connectToDB();

// ! address schema
// const addressSchema = new mongoose.Schema(
//   {
//     street: String,
//     city: String,
//     state: String,
//     zip: Number,
//   },
//   {
//     timestamps: true,
//   },
// );

// ! user schema
// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     state: String,
//     address: addressSchema,
//   },
//   {
//     timestamps: true,
//   },
// );

// const User = mongoose.model("User", userSchema);

// const createUser = async () => {
//   try {
//     const user = await User.create({
//       name: "Zachary",
//       email: "kaldid@sek.do",
//       address: {
//         street: "742 Evergreen Terrace",
//         city: "Los Angeles",
//         state: "California",
//         zip: 90001,
//       },
//     });

//     console.log(user);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// };

// createUser();

// const classRoomData = {
//   className: "Physics 101",
//   student: [
//     {
//       name: "Alice Johnson",
//       age: 17,
//       gender: "Female",
//     },
//     {
//       name: "Benjamin Lee",
//       age: 18,
//       gender: "Male",
//     },
//     {
//       name: "Chloe Kim",
//       age: 17,
//       gender: "Female",
//     },
//   ],
// };

// ! student schema
// const studentSchema = new mongoose.Schema(
//   {
//     name: String,
//     age: Number,
//     gender: String,
//   },
//   {
//     timestamps: true,
//   },
// );

// ! classroom schema
// const classRoomSchema = new mongoose.Schema(
//   {
//     className: String,
//     student: [studentSchema],
//   },
//   {
//     timestamps: true,
//   },
// );

// const ClassRoom = mongoose.model("ClassRoom", classRoomSchema);

// const createClassRoom = async () => {
//   try {
//     const classRoom = await ClassRoom.create(classRoomData);

//     console.log(classRoom);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// };

// createClassRoom();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

//! QEzVfGCQF3HXU8hv
//! tanmayvedpathak19
//! mongodb+srv://tanmayvedpathak19:QEzVfGCQF3HXU8hv@cluster0.8bhdxk8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//! mongodb+srv://tanmayvedpathak19:QEzVfGCQF3HXU8hv@cluster0.8bhdxk8.mongodb.net/student-database

const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = 8080;

const client = new MongoClient(
  "mongodb+srv://tanmayvedpathak19:QEzVfGCQF3HXU8hv@cluster0.8bhdxk8.mongodb.net/student-database",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  },
);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("db connected successfully");

    // ! database name
    const db = client.db("office");

    // ! collection
    const employees = db.collection("employee");
    const books = db.collection("books");
    const students = db.collection("students");

    // const employeesDocs = [
    //   { name: "Alice", age: 25, department: "HR" },
    //   { name: "Bob", age: 30, department: "Finance" },
    //   { name: "Charlie", age: 35, department: "IT" },
    //   { name: "David", age: 40, department: "Operations" },
    //   { name: "Eva", age: 45, department: "IT" },
    // ];

    // const result = await employees.insertMany(employeesDocs);
    // console.log(result);

    // const booksDocs = [
    //   {
    //     title: "To Kill a Mockingbird",
    //     author: "Harper Lee",
    //     year: 1960,
    //     genre: "Dram",
    //   },
    //   {
    //     title: "The 1984",
    //     author: "Geaorge Orwell",
    //     year: 1949,
    //     genre: "Dystopian",
    //   },

    //   {
    //     title: "The Catcher in the Rye",
    //     author: "JD",
    //     year: 1951,
    //     genre: "Drama",
    //   },
    //   {
    //     title: "The Brave World",
    //     author: "Huxley",
    //     year: 1932,
    //     genre: "Dysptopian",
    //   },
    //   {
    //     title: "The Hobbit",
    //     author: "J.R.R",
    //     year: 1937,
    //     genre: "Fantasy",
    //   },
    // ];

    // const bookResult = await books.insertMany(booksDocs);
    // console.log(bookResult);

    // const studentsDocs = [
    //   {
    //     name: "Alice",
    //     age: 25,
    //     grades: [90, 85, 88],
    //     sports: ["soccer", "basketbal"],
    //   },
    //   {
    //     name: "Bob",
    //     age: 30,
    //     grades: [70, 75, 80],
    //     sports: ["basketbal"],
    //   },
    //   {
    //     name: "David",
    //     age: 28,
    //     grades: [80, 90, 92],
    //     sports: ["basketbal", "soccer", "tennis"],
    //   },
    //   {
    //     name: "Prince",
    //     age: 25,
    //     grades: [85],
    //     sports: [],
    //   },
    //   {
    //     name: "Emily",
    //     age: 27,
    //     grades: [90, 95],
    //     sports: ["soccer", "tennis"],
    //   },
    // ];

    // const studentResult = await students.insertMany(studentsDocs);
    // console.log(studentResult);

    // ! -------------------------- querying --------------------------

    // ! gt
    // const employeeCursor = employees.find({ age: { $gt: 30 } });
    // const result = await employeeCursor.toArray();
    // console.log(result);

    // ! gte
    // const employeeCursor = employees.find({ age: { $gte: 30 } });
    // const result = await employeeCursor.toArray();
    // console.log(result);

    // ! ne
    // const employeeCursor = employees.find({ age: { $ne: 30 } });
    // const result = await employeeCursor.toArray();
    // console.log(result);

    // ! lt
    // const employeeCursor = employees.find({ age: { $lt: 30 } });
    // const result = await employeeCursor.toArray();
    // console.log(result);

    // ! lte
    // const employeeCursor = employees.find({ age: { $lte: 30 } });
    // const result = await employeeCursor.toArray();
    // console.log(result);

    // ! nin
    // const employeeCursor = employees.find({ age: { $nin: [25, 30, 45] } });
    // const result = await employeeCursor.toArray();
    // console.log(result);

    // ! -------------------------- operator --------------------------

    // ! or
    // const bookCursor = books.find({
    //   $or: [{ genre: "Drama" }, { year: { $lt: 1950 } }],
    // });
    // const result = await bookCursor.toArray();
    // console.log(result);

    // ! and
    const bookCursor = books.find({
      $and: [{ genre: "Drama" }, { year: { $gt: 1950 } }],
    });
    const result = await bookCursor.toArray();
    console.log(result);
  } catch (error) {
    console.log("error:", error);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

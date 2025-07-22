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

    //! database name
    const db = client.db("school");

    //! collection
    const students = db.collection("students");

    //! document using insertOne
    // const result = await students.insertOne({
    //   name: "Effie",
    //   age: 10,
    //   subjects: ["English", "Marathi", "Maths"],
    // });

    //! document using insertMany
    // const results = await students.insertMany([
    //   {
    //     name: "Alexander",
    //     age: 7,
    //     subjects: ["English", "Marathi", "Maths"],
    //   },
    //   {
    //     name: "Lola",
    //     age: 2,
    //     subjects: ["English", "Marathi", "Maths"],
    //   },
    //   {
    //     name: "Barry",
    //     age: 16,
    //     subjects: ["English", "Marathi", "Maths"],
    //   },
    // ]);

    //! Read operation
    // ! find()
    // const resultCluster = students.find();
    // const result = await resultCluster.toArray();

    // ! find()
    const stu = await students.findOne({ age: 16 });

    console.log(stu);
  } catch (error) {
    console.log("error:", error);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

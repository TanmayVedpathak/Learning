const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongodb connect successfully...");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

connectToDB();

// ! Middleware: Check if user is logged in
const isAuthenticated = (req, res, next) => {
  const token = req.cookies ? req.cookies.token : null;
  if (!token) {
    return res.status(401).redirect("/login");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.redirect("/login");
    req.user = decoded; // Store user data for later use in request
    next();
  });
};

// ! Middleware: Check if user has admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).send("Forbidden: Admins only.");
};

// ! configure express session

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
  });

  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userFound = await User.findOne({ username });

  if (userFound && bcrypt.compare(password, userFound.password)) {
    const token = jwt.sign(
      {
        username: userFound.username,
        role: userFound.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      },
    );

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });

    res.status(301).redirect("/dashboard");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.redirect("/login");
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  const userData = req.user ? req.user : null;
  if (userData) {
    const { username } = userData;
    res.render("dashboard", { username });
  } else {
    res.status(301).redirect("/login");
  }
});

app.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.render("admin");
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

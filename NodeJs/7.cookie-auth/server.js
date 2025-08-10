const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const users = [
  {
    username: "john_doe",
    password: "pass1234",
    role: "admin",
  },
  {
    username: "sarah_smith",
    password: "securePass!",
    role: "editor",
  },
  {
    username: "michael_brown",
    password: "myPassword2025",
    role: "viewer",
  },
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const userFound = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (userFound) {
    res.cookie("userData", JSON.stringify(userFound), {
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days expiration
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(301).redirect("/dashboard");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("userData");
  res.redirect("/login");
});

app.get("/dashboard", (req, res) => {
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;
  if (userData) {
    const { username } = userData;
    res.render("dashboard", { username });
  } else {
    res.status(301).redirect("/login");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

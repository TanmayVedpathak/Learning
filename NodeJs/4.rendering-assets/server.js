const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.get("/gallery", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "gallery.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

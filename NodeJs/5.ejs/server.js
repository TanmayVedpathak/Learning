const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRouter");

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.use("/users", userRouter);
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

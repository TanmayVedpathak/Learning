const express = require("express");
const fs = require("fs");
const path = require("path");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "welcome to express routing",
        data: [],
    });
});

app.use("/users", userRouter);

app.use((req, res) => {
    res.status(404).json({
        status: "failure",
        message: "404 Not Found",
        data: [],
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

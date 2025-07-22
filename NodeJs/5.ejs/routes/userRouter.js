const express = require("express");
const fs = require("fs");
const path = require("path");

const userJSON = path.join(__dirname, "../data/users.json");

const userRouter = express.Router();

const readJSONData = () => {
    try {
        const data = fs.readFileSync(userJSON, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Read error:", err);
        return [];
    }
};

userRouter.get("/", (req, res) => {
    const data = readJSONData();
    res.render("users", {
        status: "success",
        message: "List of all users",
        data,
    });
});

userRouter.get("/:id", (req, res) => {
    const data = readJSONData();

    if (!data) {
        return res.json({
            status: "failure",
            message: "failure during accessing the database",
            data: [],
        });
    }

    const userIndex = data.findIndex(
        (user) => user.id === Number(req.params.id),
    );

    if (userIndex < 0) {
        return res.render("user", {
            status: "failure",
            message: "user not found",
            data: [],
        });
    }

    res.render("user", {
        status: "success",
        message: "user",
        data: data[userIndex],
    });
});

module.exports = userRouter;

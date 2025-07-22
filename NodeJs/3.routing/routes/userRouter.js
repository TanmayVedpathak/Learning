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

const writeProducts = (data) => {
    try {
        fs.writeFileSync(userJSON, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Write error:", err);
        return false;
    }
};

userRouter.get("/", (req, res) => {
    const data = readJSONData();
    res.json({
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
        return res.json({
            status: "failure",
            message: "user not found",
            data: [],
        });
    }

    res.json({
        status: "success",
        message: "user",
        data: data[userIndex],
    });
});

userRouter.post("/", (req, res) => {
    const data = readJSONData();

    if (!data) {
        return res.json({
            status: "failure",
            message: "failure during accessing the database",
            data: [],
        });
    }

    const userFound = data.find((user) => user.id === Number(req.body.id));

    if (userFound) {
        return res.json({
            status: "failure",
            message: "user already exist",
            data: [],
        });
    }

    data.push(req.body);
    if (writeProducts(data)) {
        res.json({
            status: "success",
            message: "user added successfully",
            data,
        });
    } else {
        res.json({
            status: "failure",
            message: "error while adding user",
            data: [],
        });
    }
});

userRouter.put("/:id", (req, res) => {
    const data = readJSONData();

    if (!data) {
        return res.json({
            status: "failure",
            message: "failure during accessing the database",
            data: [],
        });
    }

    const userFound = data.findIndex((user) => user.id === Number(req.body.id));

    if (!userFound) {
        return res.json({
            status: "failure",
            message: "user does not exist",
            data: [],
        });
    }

    if (writeProducts(data)) {
        res.json({
            status: "success",
            message: "user added successfully",
            data,
        });
    } else {
        res.json({
            status: "failure",
            message: "error while adding user",
            data: [],
        });
    }
});

userRouter.delete("/:id", (req, res) => {
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
        return res.json({
            status: "failure",
            message: "user not found",
            data: [],
        });
    }

    const filteredData = data.filter(
        (user) => user.id !== Number(req.params.id),
    );
    if (writeProducts(filteredData)) {
        res.json({
            status: "success",
            message: "user deleted successfully",
            data: filteredData,
        });
    } else {
        res.json({
            status: "failure",
            message: "error while deleting user",
            data: [],
        });
    }
});

module.exports = userRouter;

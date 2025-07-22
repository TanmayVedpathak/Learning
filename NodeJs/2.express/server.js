const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const productJsonPath = path.join(__dirname, "products.json");

// Utility functions
const readProducts = () => {
    try {
        const data = fs.readFileSync(productJsonPath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Read error:", err);
        return [];
    }
};

const writeProducts = (data) => {
    try {
        fs.writeFileSync(productJsonPath, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Write error:", err);
        return false;
    }
};

// Routes
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to products home page",
    });
});

app.get("/products", (req, res) => {
    const products = readProducts();
    res.json({
        status: "success",
        data: products,
    });
});

app.get("/products/:id", (req, res) => {
    const products = readProducts();
    const productId = Number(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({
            status: "failure",
            message: `Product with id:${productId} not found`,
        });
    }

    res.json({
        status: "success",
        data: product,
    });
});

app.post("/product", (req, res) => {
    const products = readProducts();
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({
            status: "failure",
            message: "Product id and name are required",
        });
    }

    const exists = products.find((p) => p.id === id || p.name === name);
    if (exists) {
        return res.status(409).json({
            status: "failure",
            message: "Product with same id or name already exists",
        });
    }

    products.push(req.body);
    if (writeProducts(products)) {
        res.status(201).json({
            status: "success",
            message: "Product added",
            data: products,
        });
    } else {
        res.status(500).json({
            status: "failure",
            message: "Error writing product",
        });
    }
});

app.put("/product/:id", (req, res) => {
    const products = readProducts();
    const productId = Number(req.params.id);
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
        return res.status(404).json({
            status: "failure",
            message: `Product with id:${productId} not found`,
        });
    }

    // Merge existing product with updated values
    products[index] = { ...products[index], ...req.body };

    if (writeProducts(products)) {
        res.json({
            status: "success",
            message: "Product updated",
            data: products,
        });
    } else {
        res.status(500).json({
            status: "failure",
            message: "Error updating product",
        });
    }
});

app.delete("/product/:id", (req, res) => {
    const products = readProducts();
    const productId = Number(req.params.id);

    const filtered = products.filter((p) => p.id !== productId);

    if (filtered.length === products.length) {
        return res.status(404).json({
            status: "failure",
            message: `Product with id:${productId} not found`,
        });
    }

    if (writeProducts(filtered)) {
        res.json({
            status: "success",
            message: "Product deleted",
            data: filtered,
        });
    } else {
        res.status(500).json({
            status: "failure",
            message: "Error deleting product",
            data: [],
        });
    }
});

// 404 fallback
app.use((req, res) => {
    res.status(404).json({
        status: "failure",
        message: "Route not found",
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

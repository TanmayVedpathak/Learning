const http = require("http");
const url = require("url");
const products = require("./products.json");

const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true);
    const pathName = parsedURL.pathname;
    const pathComponent = pathName.split("/").filter(Boolean);

    if (pathComponent[0] === "products" && pathComponent[1]) {
        var productData = products.filter((product) => {
            return product.id == pathComponent[1];
        });
        res.statusCode = 200;
        if (productData.length) {
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify(productData));
        } else {
            res.setHeader("content-type", "text/plain");
            res.end("no product found");
        }
    } else if (pathComponent[0] === "products") {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(products));
    } else if (req.url === "/" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.end("Home page");
    } else if (req.url === "/about" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.end("About Us page");
    } else if (req.url === "/contact" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.end("Contact Us page");
    } else {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");
        res.end("Page Not Found");
    }
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// const http = require("http");

// const server = http.createServer((req, res) => {
//     console.log(`Received ${req.method} request for: ${req.url}`);

//     res.writeHead(200, { "content-type": "text/plain" });

//     res.end("hello world, my first nodejs server");
// });

// const PORT = 5000;

// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

// 1. Import required modules
const http = require("http");

// 2. Define the handler
const requestHandler = (req, res) => {
    // send response
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, world! This is my first Node.js server.");
};

// 3. Create the server
const server = http.createServer(requestHandler);

// 4. Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});

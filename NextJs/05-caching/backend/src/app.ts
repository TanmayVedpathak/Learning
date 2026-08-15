import express, { type Request, type Response } from "express";

type Message = {
  id: number;
  text: string;
};

const app = express();

app.get("/messages", (req: Request, res: Response<Message[]>) => {
  const requestSource = req.headers["x-id"];

  console.log(`${new Date().toISOString()}: EXECUTING /messages on backend from ${requestSource}`);

  res.json([
    { id: 1, text: "Hello World" },
    { id: 2, text: "Another message from the separate backend" },
  ]);
});

app.listen(8080, () => {
  console.log("Backend server running on http://localhost:8080");
});

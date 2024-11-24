import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.get("/allTodos", (req: Request, res: Response) => {
  res.send("Todos");
});

app.listen(PORT, () => console.log("Server is running"));

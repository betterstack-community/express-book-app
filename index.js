import express from "express";
import db from "./database.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/books/:id", async (req, res) => {
  const book = await db.get("SELECT * FROM books WHERE id = ?", [
    req.params.id,
  ]);
  res.json(book);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

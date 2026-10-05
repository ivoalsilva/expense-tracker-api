import "dotenv/config";
import pg from "pg";
import express from "express";

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.use(express.json());
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.get("/health/db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});
app.post("/expenses", async (req, res) => {
  const { amount, description, expense_date, category } = req.body;
  const result = await pool.query(
    "INSERT INTO expenses (amount, description, expense_date, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [amount, description, expense_date, category],
  );
  res.status(201).json(result.rows[0]);
});
app.get("/expenses", async (req, res) => {
  const search = await pool.query(
    "SELECT * FROM expenses ORDER BY expense_date DESC",
  );
  res.status(200).json(search.rows);
});
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

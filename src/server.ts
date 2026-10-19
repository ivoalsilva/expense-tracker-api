import "dotenv/config";
import pg from "pg";
import express from "express";
import {
  listExpensesController,
  createExpenseController,
  deleteExpenseController,
} from "./controllers/expenses.controller.js";

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
app.post("/expenses", createExpenseController);
app.get("/expenses", listExpensesController);
app.delete("/expenses/:id", deleteExpenseController);
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

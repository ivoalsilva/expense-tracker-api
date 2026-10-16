import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function listExpenses() {
  const result = await pool.query(
    "SELECT * FROM expenses ORDER BY expense_date DESC",
  );
  return result.rows;
}

export async function createExpense(
  amount: number,
  description: string,
  expense_date: string,
  category: string
) {
  const result = await pool.query(
    "INSERT INTO expenses (amount, description, expense_date, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [amount, description, expense_date, category],
  );
  return result.rows[0];
}

export async function deleteExpense (id: string) {
  const result = await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
  return result.rowCount;
}

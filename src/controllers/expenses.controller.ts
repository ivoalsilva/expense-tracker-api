import { Request, Response } from "express";
import {
  listExpenses,
  createExpense,
  deleteExpense,
} from "../services/expenses.service.js";
import {
  createExpenseSchema,
  expenseIdSchema,
} from "../schemas/expenses.schema.js";

export async function listExpensesController(req: Request, res: Response) {
  const result = await listExpenses();
  res.status(200).json(result);
}

export async function createExpenseController(req: Request, res: Response) {
  const parsed = createExpenseSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }
  const { amount, description, expense_date, category } = parsed.data;
  const result = await createExpense(
    amount,
    description,
    expense_date,
    category,
  );
  res.status(201).json(result);
}

export async function deleteExpenseController(req: Request, res: Response) {
  const parsed = expenseIdSchema.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.issues,
    });
    return;
  }
  const result = await deleteExpense(parsed.data.id);
  if (result === 0) {
    res.status(404).send();
    return;
  }
  return res.status(204).send();
}

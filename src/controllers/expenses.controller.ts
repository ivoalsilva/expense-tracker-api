import { Request, Response } from "express";
import {
  listExpenses,
  createExpense,
  deleteExpense,
} from "../services/expenses.service.js";

export async function listExpensesController(req: Request, res: Response) {
  const result = await listExpenses();
  res.status(200).json(result);
}

export async function createExpenseController(req: Request, res: Response) {
  const { amount, description, expense_date, category } = req.body;
  const result = await createExpense(
    amount,
    description,
    expense_date,
    category,
  );
  res.status(201).json(result);
}

export async function deleteExpenseController(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const result = await deleteExpense(id);
  if (result === 0) {
    res.status(404).send();
    return;
  }
  return res.status(204).send();
}

import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string(),
  expense_date: z.string(),
  category: z.string(),
});

export const expenseIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

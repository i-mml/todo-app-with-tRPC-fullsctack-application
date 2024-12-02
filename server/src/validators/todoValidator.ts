import { z } from "zod";
import { Statuses } from "../types/todo";

export const AddTodoValidator = z.object({
  title: z.string(),
  status: z
    .enum(Object.values(Statuses) as [Statuses, ...Statuses[]])
    .optional(),
});

export const TodoInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  status: z
    .enum(Object.values(Statuses) as [Statuses, ...Statuses[]])
    .optional(),
});

export const DeleteTodoInput = z.object({
  id: z.string(),
});

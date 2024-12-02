import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { TodoModel } from "../models/todoItem";
import {
  AddTodoValidator,
  DeleteTodoInput,
  TodoInput,
} from "../validators/todoValidator";
import mongoose from "mongoose";
import { createResponse } from "../helpers/createResponse";

const t = initTRPC.create();

export const todosRouter = t.router({
  list: t.procedure.query(async () => {
    const todosList = await TodoModel.find();
    return todosList;
  }),
  add: t.procedure.input(AddTodoValidator).mutation(async ({ input }) => {
    const todo = new TodoModel({
      title: input.title,
    });
    const result = await todo.save();
    return result;
  }),
  edit: t.procedure.input(TodoInput).mutation(async ({ input }) => {
    console.log(input);
  }),
  delete: t.procedure.input(DeleteTodoInput).mutation(async ({ input }) => {
    const { id } = input;
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return createResponse(
        false,
        "Todo not found",
        undefined,
        "The target Todo not found in database."
      );
    }
    return createResponse(true, "Todo deleted successfully", deletedTodo);
  }),
});

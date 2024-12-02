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

    if (!todosList) {
      return createResponse(false, "Todos list not found", undefined);
    }

    return createResponse(true, "Get todos list successfully", todosList);
  }),

  add: t.procedure.input(AddTodoValidator).mutation(async ({ input }) => {
    try {
      const newTodo = await TodoModel.create(input);
      return createResponse(true, "Todo created successfully", newTodo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return createResponse(
          false,
          "Failed to create todo",
          undefined,
          error.message
        );
      }
    }
  }),

  find: t.procedure.input(DeleteTodoInput).mutation(async ({ input }) => {
    const { id } = input;

    try {
      const todo = await TodoModel.findById(id);

      if (!todo) {
        return createResponse(
          false,
          "Todo not found",
          undefined,
          "The requested todo could not be found in the database."
        );
      }

      return createResponse(true, "Todo fetched successfully", todo);
    } catch (error: any) {
      return createResponse(
        false,
        "Failed to fetch todo",
        undefined,
        error.message
      );
    }
  }),

  edit: t.procedure.input(TodoInput).mutation(async ({ input }) => {
    const { id, ...updateFields } = input;

    const editedTodo = await TodoModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!editedTodo) {
      return createResponse(
        false,
        "Todo not found",
        undefined,
        "The target Todo not found in database."
      );
    }
    console.log(editedTodo);
    return createResponse(true, "Todo edited successfully", editedTodo);
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

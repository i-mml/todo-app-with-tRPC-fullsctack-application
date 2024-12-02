import mongoose from "mongoose";
import { Statuses } from "../types/todo";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: Statuses, default: "TODO" },
});

export const TodoModel = mongoose.model("Todo", TodoSchema);

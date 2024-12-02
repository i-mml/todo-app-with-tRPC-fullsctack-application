import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routes";
import cors from "cors";
import connectDb from "./db";

import express from "express";

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount tRPC middleware
app.use(
  "/trpc",
  createExpressMiddleware({
    middleware: cors(),
    router: appRouter,
    createContext() {
      return {};
    },
  })
);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

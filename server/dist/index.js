"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
const server_1 = require("@trpc/server");
const standalone_1 = require("@trpc/server/adapters/standalone");
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to MongoDb..."))
    .catch((err) => console.log("Could not connect t o Mongodb...", err));
const t = server_1.initTRPC.create();
const publicProcedure = t.procedure;
const router = t.router;
const appRouter = router({
    greeting: publicProcedure
        // This is the input schema of your procedure
        // 💡 Tip: Try changing this and see type errors on the client straight away
        .input(zod_1.z
        .object({
        name: zod_1.z.string().nullish(),
    })
        .nullish())
        .query(({ input }) => {
        // This is what you're returning to your client
        return {
            text: `hello ${input?.name ?? "world"}`,
            // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
        };
    }),
});
// create server
(0, standalone_1.createHTTPServer)({
    middleware: (0, cors_1.default)(),
    router: appRouter,
    createContext() {
        console.log("context 3");
        return {};
    },
}).listen(2022);

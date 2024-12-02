"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
var server_1 = require("@trpc/server");
var standalone_1 = require("@trpc/server/adapters/standalone");
var cors_1 = require("cors");
var zod_1 = require("zod");
var mongoose_1 = require("mongoose");
mongoose_1.default
    .connect("mongodb://localhost/playground")
    .then(function () { return console.log("Connected to MongoDb..."); })
    .catch(function (err) { return console.log("Could not connect t o Mongodb...", err); });
var t = server_1.initTRPC.create();
var publicProcedure = t.procedure;
var router = t.router;
var appRouter = router({
    greeting: publicProcedure
        // This is the input schema of your procedure
        // 💡 Tip: Try changing this and see type errors on the client straight away
        .input(zod_1.z
        .object({
        name: zod_1.z.string().nullish(),
    })
        .nullish())
        .query(function (_a) {
        var _b;
        var input = _a.input;
        // This is what you're returning to your client
        return {
            text: "hello ".concat((_b = input === null || input === void 0 ? void 0 : input.name) !== null && _b !== void 0 ? _b : "world"),
            // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
        };
    }),
});
// create server
(0, standalone_1.createHTTPServer)({
    middleware: (0, cors_1.default)(),
    router: appRouter,
    createContext: function () {
        console.log("context 3");
        return {};
    },
}).listen(2022);

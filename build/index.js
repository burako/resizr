"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeIndex_1 = __importDefault(require("./routes/routeIndex"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/', routeIndex_1.default);
app.use('/images', routeIndex_1.default);
app.listen(port, () => {
    console.log(`this app is listening to you on port ${port}`);
});
exports.default = app;

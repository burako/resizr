"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/api', function (req, res) {
    res.send('resizing the image');
});
app.listen(port, () => {
    console.log(`this app is listening to you on port ${port}`);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resize = (req, res, next) => {
    const url = req.url;
    console.log(`${url} was visited`);
    next();
};
exports.default = resize;

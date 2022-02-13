"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const posix_1 = require("path/posix");
const resize = (req, res, next) => {
    const picName = req.query.picname;
    const picWidth = parseInt(req.query.width);
    const picHeight = parseInt(req.query.height);
    const inputPath = (0, posix_1.resolve)('src/assets/full/' + picName + '.jpeg');
    const outputPath = (0, posix_1.resolve)('src/assets/thumb/' + picName + '.jpeg');
    (0, sharp_1.default)(inputPath)
        .resize(picWidth, picHeight)
        .toFile(outputPath, function (err) {
        console.log(err);
    });
    next();
};
exports.default = resize;

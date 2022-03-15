"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const posix_1 = require("path/posix");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const resize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //gets user parameters from the url
    const picName = req.query.picname;
    const picWidth = parseInt(req.query.width);
    const picHeight = parseInt(req.query.height);
    //sets up the path for transformed image to be placed or an existing image to be searched
    const newFileName = picName + picWidth + 'x' + picHeight + '.jpeg';
    const outputPath = (0, posix_1.resolve)('src/assets/thumb/' + newFileName);
    //if file does not exist, calls resizeImage() asynchronously to resize the image using sharp
    // if exists, serves the existing image
    try {
        yield (0, promises_1.access)(outputPath, fs_1.constants.F_OK);
        res.sendFile(outputPath);
    }
    catch (_a) {
        const processedImage = (yield resizeImage(picName, picWidth, picHeight, outputPath));
        if (processedImage == outputPath) {
            res.sendFile(processedImage, function (err) {
                if (err) {
                    res.send(err);
                }
            });
        }
        else {
            const errorMessage = processedImage.toString();
            res.send(errorMessage);
        }
    }
    next();
});
function resizeImage(picName, picWidth, picHeight, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = (0, posix_1.resolve)('src/assets/full/' + picName + '.jpeg');
        try {
            yield (0, sharp_1.default)(inputPath).resize(picWidth, picHeight).toFile(outputPath);
            return outputPath;
        }
        catch (err) {
            return err;
        }
    });
}
exports.default = {
    resize,
    resizeImage
};

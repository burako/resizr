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
    const picName = req.query.picname;
    const picWidth = parseInt(req.query.width);
    const picHeight = parseInt(req.query.height);
    let outputPath = (0, posix_1.resolve)('src/assets/thumb/' + picName + '.jpeg');
    //const stats = await fsPromises.access(outputPath, fs.constants.F_OK,)
    try {
        yield (0, promises_1.access)(outputPath, fs_1.constants.F_OK);
        console.log('can access');
        res.sendFile(outputPath);
    }
    catch (_a) {
        console.error('File doesnt exist in path, I will resize');
    }
    // .catch(async (error) => {
    //   if (error) {
    //     console.log('File doesnt exist in path, I will resize');
    //     const processedImage = await resizeImage(picName, picWidth, picHeight, outputPath) as unknown as string;
    //     console.log(processedImage);
    //     res.sendFile(processedImage);
    //   }
    //   // else {
    //   //   console.log('File exists');
    //   //   res.sendFile(outputPath);
    //   // }
    // });
    next();
});
function resizeImage(picName, picWidth, picHeight, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = (0, posix_1.resolve)('src/assets/full/' + picName + '.jpeg');
        try {
            yield (0, sharp_1.default)(inputPath)
                .resize(picWidth, picHeight)
                .toFile(outputPath, function (err) {
                console.log(err);
            });
            return outputPath;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = resize;

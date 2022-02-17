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
const promises_1 = __importDefault(require("fs/promises"));
const resize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const picName = req.query.picname;
    const picWidth = parseInt(req.query.width);
    const picHeight = parseInt(req.query.height);
    const filePath = (0, posix_1.resolve)('src/assets/thumb/' + picName + '.jpeg');
    const stats = yield promises_1.default.stat(filePath)
        .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.log('File doesnt exist in path, I will resize');
        }
    }));
    // fs.stat(filePath, (exists) => {
    //   if (exists == null) {
    //       console.log('File exists in path');
    //       res.sendFile(filePath); //bu islemin async sekilde sharp in bitirmesini beklemesini saglamam lazim -> https://knowledge.udacity.com/questions/780792
    //   } else if (exists.code === 'ENOENT') {
    //       console.log('File doesnt exist in path');
    //       const resizedImage = resizeImage(picName, picWidth, picHeight, filePath) as unknown as string;
    //       console.log(resizedImage);
    //       //res.sendFile(resizedImage);
    //   }
    // });
    next();
});
function resizeImage(picName, picWidth, picHeight, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = (0, posix_1.resolve)('src/assets/full/' + picName + '.jpeg');
        const outputPath = filePath;
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

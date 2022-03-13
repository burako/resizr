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
const posix_1 = require("path/posix");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const resizePic_1 = __importDefault(require("../utilities/resizePic"));
const request = (0, supertest_1.default)(index_1.default);
const endpoint = "/images";
it("expects endpoint to respond with code 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request.get(endpoint);
    expect(result.status).toBe(200);
}));
it("expects resizeImage() to resize an image successfully", () => __awaiter(void 0, void 0, void 0, function* () {
    const resultPath = (0, posix_1.resolve)('src/assets/thumb/fjord.jpeg');
    const result = yield resizePic_1.default.resizeImage('fjord', 200, 300, resultPath);
    expect(result).toMatch(resultPath);
}));

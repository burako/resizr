"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizePic_1 = __importDefault(require("../utilities/resizePic"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    //res.send('all pictures');
});
routes.get('/images', resizePic_1.default.resize, (req, res) => {
    //res.send('get name and size from url, resize using middleware');
});
exports.default = routes;

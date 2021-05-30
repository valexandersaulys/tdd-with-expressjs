"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var PORT = process.env.PORT || 8001;
app.get("/", function (req, res) {
    res.send("TypeScript is working");
});
app.listen(PORT, function () {
    console.log("listening on port " + PORT);
});

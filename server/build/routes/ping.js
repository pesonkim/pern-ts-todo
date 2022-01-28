"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ping_1 = require("../controllers/ping");
const testRouter = (0, express_1.Router)();
testRouter.get('/', ping_1.pingTest);
exports.default = testRouter;

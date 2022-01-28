"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingTest = void 0;
const pingTest = (req, res, next) => {
    res.status(200).json({ message: 'pong' });
};
exports.pingTest = pingTest;

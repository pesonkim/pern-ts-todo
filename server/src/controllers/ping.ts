import { RequestHandler } from 'express';

export const pingTest: RequestHandler = (req, res, next) => {
    return res.status(200).json({ message: 'pong' });
};

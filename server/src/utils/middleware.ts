import { RequestHandler, ErrorRequestHandler, Request, Response } from 'express';

//terminal window Http request logger 
export const requestLogger: RequestHandler = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
};

//middleware for testing unhandled endpoints
export const unknownEndpoint = (req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({ error: err.message });
};

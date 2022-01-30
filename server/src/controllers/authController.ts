import jsonwebtoken from 'jsonwebtoken';
import { Request, Response } from 'express';

//POST
export const jwtSign = (req: Request, res: Response) => {
    const username = (req.body as { user: string }).user;

    const token = jsonwebtoken.sign(username, 'Secret', {});

    return res.status(200).json({ token: token, username: username });
};

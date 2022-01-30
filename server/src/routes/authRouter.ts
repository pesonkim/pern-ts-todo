import { Router } from 'express';
import { jwtSign } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/', jwtSign);

export default authRouter;

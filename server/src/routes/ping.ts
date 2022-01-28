import { Router } from 'express';
import { pingTest } from '../controllers/ping';

const testRouter = Router();

testRouter.get('/', pingTest);

export default testRouter;

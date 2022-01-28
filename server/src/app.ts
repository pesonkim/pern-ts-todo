import express from 'express';
import cors from 'cors';
import testRouter from './routes/ping';
import todoRouter from './routes/todoRouter';
import { IP, PORT } from './utils/config';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/ping', testRouter);
app.use('/api/todo', todoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

// console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
    console.log(`Server running on ${IP}:${PORT}`);
});

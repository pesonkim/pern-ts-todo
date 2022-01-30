import express from 'express';
import cors from 'cors';
import todoRouter from './routes/todoRouter';
import authRouter from './routes/authRouter';
import { IP, PORT } from './utils/config';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'))
app.use(requestLogger);

app.use('/api/todo', todoRouter);
app.use('/api/auth', authRouter);
app.use('/*', express.static('build'))

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on ${IP}:${PORT}`);
});

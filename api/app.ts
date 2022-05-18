/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express from 'express';
import indexRouter from './routes/index';

const app = express();
app.use(cors());
app.use('/', indexRouter);
app.use('/updateScores', indexRouter);
app.use('/getScores', indexRouter);

// catch 404 and forward to error handler

// error handler
app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || err);
});
const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
export default app;

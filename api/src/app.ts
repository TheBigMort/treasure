/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express from 'express';
import createError from 'http-errors';
import indexRouter from './routes/index';

const app = express();
app.use(cors());
app.use('/', indexRouter);
app.use('/getScores', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
    // render the error page
    // console.log(err);
    res.status(err.status || 500).send(err.message || err);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
export default app;

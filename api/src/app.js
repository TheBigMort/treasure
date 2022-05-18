"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const cors_1 = require("cors");
const express_1 = require("express");
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/', index_1.default);
app.use('/getScores', index_1.default);
// catch 404 and forward to error handler
// error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || err);
});
const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
exports.default = app;

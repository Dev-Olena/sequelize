const express = require('express');
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');

const rootRouter = express.Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/tasks', taskRouter);

module.exports = rootRouter;
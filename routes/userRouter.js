const express =require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');

const userRouter = express.Router();

userRouter.post('/', UserController.createOne);
userRouter.get('/', UserController.getAll);
userRouter.get('/:userId', UserController.getOne);
userRouter.put('/:userId', UserController.updateOne);
userRouter.delete('/:userId', UserController.deleteOne);



module.exports = userRouter;
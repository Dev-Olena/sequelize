const express =require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');

const userRouter = express.Router();

userRouter.post('/', UserController.createOne);
userRouter.get('/', UserController.getAll);
userRouter.get('/:userId', UserController.getOne);
userRouter.put('/:userId', UserController.updateOne);
userRouter.delete('/:userId', UserController.deleteOne);

userRouter.post('/:userId/tasks', TaskController.createTask);
userRouter.get('/:userId/tasks', TaskController.getAllUserTasks);
userRouter.get('/:userId/tasks/count', TaskController.countUserTasks);
userRouter.get('/:userId/tasks/:taskId', TaskController.getTask);
userRouter.put('/:userId/tasks/:taskId', TaskController.updateTask);
userRouter.delete('/:userId/tasks/:taskId', TaskController.deleteTask);

module.exports = userRouter;
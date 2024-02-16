const express = require('express');
const TaskController = require('../controllers/Task.controller');

const taskRouter = express.Router();

taskRouter.post('/users/:userId', TaskController.createTask);
taskRouter.get('/users/:userId', TaskController.getAllUserTasks);
taskRouter.get('/users/:userId/count', TaskController.countUserTasks);
taskRouter.get('/:taskId', TaskController.getTask);
taskRouter.put('/:taskId', TaskController.updateTask);
taskRouter.delete('/:taskId', TaskController.deleteTask);

module.exports = taskRouter;
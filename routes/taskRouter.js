const express = require('express');
const TaskController = require('../controllers/Task.controller');

const taskRouter = express.Router();

// taskRouter.get('/:taskId', TaskController.getTask)

module.exports = taskRouter;
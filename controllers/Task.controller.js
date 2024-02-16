const {Task, User} = require('../models');
const NotFoundError = require('../errors/NotFoundError');


module.exports.createTask = async (req, res, next) => {
    try {
        const {body, params: {userId}} = req;
        const task = await Task.create({...body, userId});
        res.status(201).send({data: task})
    } catch (error) {
        next(error)
    }
}

module.exports.getTask = async (req, res, next) => {
    // /users/:userId/tasks/:taskId
    try {
        const {params: {taskId}} = req;
        // const task = await Task.findByPk(Number(taskId));
        if(taskId) {
            const task = await Task.findByPk(Number(taskId));
            res.status(200).send({data: task})
        } else {
            throw new NotFoundError('Task is not found')
        }
    } catch (error) {
        next(error)
    }
}

module.exports.updateTask = async (req, res, next) => {
    try {
        const {body, params: {taskId}} = req;
        const [rowCount, updatedTask] = await Task.update(body, {
            where: {
                id: Number(taskId)
            },
            returning: true
        });
        res.status(200).send({data: updatedTask})
    } catch (error) {
        next(error)
    }

}

module.exports.deleteTask = async (req, res, next) => {
    try {
        const {params: {taskId}} = req;
        const foundTask = await Task.findByPk(taskId);
        if(foundTask) {
            const deleted = await foundTask.destroy();
            res.status(200).send({data: foundTask})
        }
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(Number(userId));
        if (user) {
            const allUserTasks = await user.getTasks();
            res.status(200).send({data: allUserTasks})
        } else {
            throw new NotFoundError('User not found')
        }
    } catch (error) {
        next(error)
    }
}

module.exports.countUserTasks = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(Number(userId));
        const tasksCount = await user.countTasks();
        res.status(200).send({data: tasksCount})
    } catch (error) {
        res.status(400).send(error)
    }
}


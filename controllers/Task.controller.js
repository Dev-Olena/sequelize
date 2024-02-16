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


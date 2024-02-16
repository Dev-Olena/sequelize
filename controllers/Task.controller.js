const {Task, User} = require('../models');


module.exports.createTask = async (req, res, next) => {
    try {
        const {body, params: {userId}} = req;
        const task = await Task.create({...body, userId});
        res.status(201).send({data: task})
    } catch (error) {
        
    }
}
module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(Number(userId));
        const allUserTasks = await user.getTasks();
        res.status(200).send({data: allUserTasks})
    } catch (error) {
        res.status(400).send(error)
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


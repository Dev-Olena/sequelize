const {Group, User} = require('../models');
const NotFoundError = require('../errors/NotFoundError');


module.exports.createOne = async (req, res, next) => {
    try {
        const {body} = req;
        const group = await Group.create(body);
        res.status(201).send({data: group})
    } catch (error) {
        next(error) 
    }
};

module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const {params: {groupId, userId}} = req;
        const groupInstanse = await Group.findByPk(Number(groupId));
        const userInstanse = await User.findByPk(Number(userId));
        if (groupInstanse && userInstanse) {
            await groupInstanse.addUser(userInstanse);
            res.status(200).send({
                meta: {
                    groupAdded: groupId,
                    userAdded: userId
                }
            })
        } else {
            throw new NotFoundError();
        }
    } catch (error) {
        next(error)
    }
};



module.exports.updateGroup = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
};

module.exports.deleteGroup = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
};

module.exports.removeUserFromGroup = async (req, res, next) => {
    try {
        const {params: {groupId, userId}} = req;
        const groupInstanse = await Group.findByPk(Number(groupId));
        const userInstanse = await User.findByPk(Number(userId));
        if (groupInstanse && userInstanse) {
            await groupInstanse.removeUser(userInstanse);
            res.status(200).send({
                meta: {
                removedUser: userId
            }})
        }
    } catch (error) {
        next(error)
    }
};

module.exports.getGroupWithMembers = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;
        const groupWithMembers = await Group.findAll({
            where: {
                id: Number(groupId)
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }]
        });
        res.status(200).send({data: groupWithMembers})
    } catch (error) {
        next(error)
    }
};

module.exports.countMembers = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;
        const groupInstanse = await Group.findByPk(Number(groupId));
        if (groupInstanse) {
            const countMembers = await groupInstanse.countUsers();
            res.status(200).send({
                meta: {
                    countMembers
                }
            })
        } else {
            throw new NotFoundError();
        }
    } catch (error) {
        next(error)
    }
    
}
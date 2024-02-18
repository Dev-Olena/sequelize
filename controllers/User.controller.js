const {User, Group} = require('../models');

module.exports.createOne = async (req, res, next) => {
    try{
        const {body} = req;
        const user = await User.create(body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports.getAll = async (req, res, next) => {
    try{
        const users = await User.findAll();
        res.status(200).send(users)
    } catch(error) {
        res.status(400).send(error)
    }

};

module.exports.getOne = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId, {
            // attributes: ['firstName', 'lastName']
            attributes: {
                exclude: ['password']
            }
        });//завжди string
        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error)
    }
};

module.exports.updateOne = async (req, res, next) => {
    try {
        const{body, params: {userId}} = req;
        const updated = await User.update(body, {
            where: {
                id: Number(userId)
            }
        })
        res.status(200).send({data: updated});
    } catch (error) {
        res.status(400).send(error)
    }

};

module.exports.deleteOne = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const foundUser = await User.findByPk(userId);
        if(foundUser) {
            const deleted = await foundUser.destroy();
            res.status(200). send({data: deleted})
        }
    } catch (error) {
        res.status(400).send(error)
    }
};

module.exports.getUsersWithGroups = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const userWithGroups = await User.findAll({
            where: {
                id: Number(userId)
            },
            include: [{
                model: Group
            }]
        });
        res.status(200).send({data: userWithGroups})
        
    } catch (error) {
        next(error)
    }
};
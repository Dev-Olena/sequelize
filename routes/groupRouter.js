const express = require('express');
const GroupController = require('../controllers/Group.controller');

const groupRouter = express.Router();

groupRouter.post('/', GroupController.createOne);
groupRouter.put('/:groupId/:userId', GroupController.addUserToGroup);
groupRouter.delete('/:groupId/:userId', GroupController.removeUserFromGroup);
groupRouter.get('/:groupId', GroupController.getGroupWithMembers);
groupRouter.get('/:groupId/count', GroupController.countMembers)

module.exports = groupRouter;
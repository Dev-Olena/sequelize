const express = require('express');
const multer = require('multer');
const path = require('path');
const GroupController = require('../controllers/Group.controller');

const groupRouter = express.Router();

const STATIC_PATH = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, STATIC_PATH)
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
    }
});

const upload = multer({storage});

groupRouter.post('/', GroupController.createOne);
groupRouter.put('/:groupId/:userId', GroupController.addUserToGroup);
groupRouter.delete('/:groupId/:userId', GroupController.removeUserFromGroup);
groupRouter.get('/:groupId', GroupController.getGroupWithMembers);
groupRouter.get('/:groupId/count', GroupController.countMembers);
groupRouter.delete('/:groupId', GroupController.deleteGroup);

groupRouter.post('/:groupId/image', upload.single('image'), GroupController.createImage);

module.exports = groupRouter;
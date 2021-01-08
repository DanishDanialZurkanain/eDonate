var usersController = require('../controller/users');
var express = require('express');
var router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.findUser);
router.post('/', usersController.createUser);
router.post('/authenticate', usersController.authenticate);
router.patch('/forgotPassword/:userName', usersController.forgotPassword);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
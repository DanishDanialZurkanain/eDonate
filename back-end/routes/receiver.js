var receiverController = require('../controller/receiver');
var express = require('express');
var router = express.Router();

router.get('/', receiverController.getReceivers);
router.get('/active', receiverController.getActiveReceivers);
router.get('/donator/:userId', receiverController.getDonator);
router.get('/request/:id', receiverController.getRequestReceivers);
router.get('/:id', receiverController.findReceiver);
router.post('/', receiverController.createReceiver);
router.patch('/:id', receiverController.updateReceiver);
router.delete('/:id', receiverController.deleteReceiver);

module.exports = router;
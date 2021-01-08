var donatorController = require('../controller/donator');
var express = require('express');
var router = express.Router();

router.get('/', donatorController.getDonators);
router.get('/:id', donatorController.findDonator);
router.post('/', donatorController.createDonator);
router.patch('/:id', donatorController.updateDonator);
router.delete('/:id', donatorController.deleteDonator);

module.exports = router;
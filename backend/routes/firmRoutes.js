const express = require('express');
const verifyToken = require('../middlewares/vendorToken')
const firmController = require('../controllers/firmController');


const router = express.Router();
router.post('/add-firm', verifyToken, firmController.addFirm)


module.exports = router;
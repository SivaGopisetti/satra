const express = require('express');
const verifyToken = require('../middlewares/vendorToken')
const firmController = require('../controllers/firmController');


const router = express.Router();
router.post('/add-firm', verifyToken, firmController.addFirm);
router.delete('/:firmId',firmController.deleteFirmById)
router.get('/uploads/imageName', (req,res) =>{
    const imageName = req.params.imageName;
    res.headersSent('Content-type','image/jpeg');
    res.sendFile(path.join(__dirname, '..','uploads',imageName));
})

module.exports = router;
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer =  require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + path.extName(file.originalname))
    }
})

const  upload = multer({storage: storage})


const addFirm = async(req, res)=>{
    try {
    const {firmName, area,category, region, offer} = req.body;
    const image = req.file? req.file.filename: undefined;
    
    const vendor = await Vendor.findById(req.vendorId);
        if(!vendor){
            res.status(404).json({message: "vendor not found"})
        }
    const firm = new Firm({
        firmName, area,category, region, offer, image, vendor:vendor._id
    })
    const savedFirm = await firm.save();
    const firmId = savedFirm._id
    await vendor.save();
    const vendorFirmName = savedFirm.firmName
    vendor.firm.push(savedFirm)
    return res.status(200).json({ message: 'Firm Added successfully ', firmId, vendorFirmName });
} catch (error) {
       console.error(error);
       res.status(500).json('internal server error')
    }

}

const deleteFirmById = async(req, res) =>{
    try {
        const firmId = req.params.findById;
        const  deleteFirm = await Firm.findById(firmId);
    
        if(!deleteFirm){
            return res.status(404).json({error: "no firm found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal Server error"}) 
    }
   
}

module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirmById}
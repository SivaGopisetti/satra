const Firm = require('../models/Firm');
const vendor = require('../models/Vendor'); 
const multer =  require('multer');


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + '_' + file.originalname)
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
    const firm = new firm({
        firmName, area,category, region, offer, image, vendor:vendor.I
    })
    await firm.save();

    return res.status(200).json({message: "firm added successfully"})
    } catch (error) {
       console.error(error);
       res.status(500).json('internal server error')
    }

}

module.exports = {addFirm:[upload.single('image'),addFirm]}
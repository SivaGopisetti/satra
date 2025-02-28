const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv')

dotEnv.config()
const seceretKey = process.env.TOKEN_KEY;

const verifyToken = async(req, res, next) => {
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error: "Token is not valid"});
    }

    try{
        const decoded = jwt.verify(token,seceretKey);
        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        req.vendorId = vendor._id

        next()
    }catch(error){ 
        console.error(error);
            return res.status(500).json({error: "invalid token"})
    }
}

module.exports = verifyToken;
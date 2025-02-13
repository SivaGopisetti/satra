const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');
dotEnv.config();
const secretKey = process.env.TOKEN_KEY;

const vendorRegister = async(req, res)=>{
    const {username, email, password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json('Email already exsited');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(200).json({message: "registation Successful"})
        console.log("registerd")
    }catch(error){
        console.log(error)
        res.status(500).json({error: "internal server error"});
    }
}

const vendorLogin = async(req, res)=>{
    const {email,password} = req.body;

    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
          return res.status(401).json({error: "invalid username or password"})   
        }
        const token = jwt.sign({vendorId: vendor._id},secretKey, {expiresIn:'1h'})

        res.status(200).json({success : "loging sucessfully",token});
    }catch(error){
    console.log(error);
    res.status(500).json({ error: "Internal server error" });

    }
}

const getAllVendors = async()=>{
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}
module.exports = {vendorRegister,vendorLogin,getAllVendors }
const mongoose = require('mongoose');
const Vendor = require('./Vendor');

const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        required: true,
        unique : true
    },
    area : {
        type : String,
        required : true
    },
    catgeory: {
        type:[{
                type:String,
                enum : ['veg','non-veg']
            }]
    },
    region:{
        type :[{
            type:String,
            enum:['south-indian','north-indian', 'chinese','bakery']
        }]
    },
    offer:{
    },
    image:{
        type: String
    },
    Vendor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor'
    }]
})

const Firm = mongoose.model('Firm',firmSchema);

module.exports = Firm;
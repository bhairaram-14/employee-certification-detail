const mongoose = require('mongoose')


const empSchema=mongoose.Schema({
  
    name:String,
    email:{
        type :String,
        unique: true
    },
    emp_code:{
        type :String,
        unique: true
    },
    otp:Number
})

const certSchema = mongoose.Schema({
    cert_name: String,
    productname: String,
    certficate_Id: String,
    description :String,
    issuedDate:Date,
    expirationDate:Date,
    issuedBy:String,
    emp_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"empSchema",
    }
    
})

const cert= mongoose.model("cert",certSchema);
const emp = mongoose.model("emp",empSchema); 





module.exports = {cert,emp};
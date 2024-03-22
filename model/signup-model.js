const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SignUpSchema = new Schema({
    name : {type:String,required:true},
    emailId: {type : String , required : true },
    password: {type : String , required : true },
    image : {type : String , required : true },
    address : {type : String , required : true},
    phoneNumber : {type : Number , required : true},
    cname: {type : String , required : true},
    gst: {type : String , required : true}
  })

  module.exports = mongoose.model("User", SignUpSchema)
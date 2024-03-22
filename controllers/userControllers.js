const HttpError = require("../model/httpError")
const User = require('../model/signup-model')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require("express-validator")

  const signUp = async (req,res,next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){

      const error = new HttpError("Invalid inputs passed, please check your data " ,404 )
      return next(error)

    }

    const {name,emailId,password,address,phoneNumber,cname,gst} = req.body

    let existingUser;

    try{
        existingUser =await User.findOne({emailId:emailId})
       
    }catch(err){
        const error = new HttpError("Unable to add new user" ,404 )
        return next(error)
    }
    if(existingUser){
        const error = new HttpError("User already exists" , 422)
        return next(error)
    }

    let hashedPassword;
    try{

    hashedPassword =await bcrypt.hash(password , 12)

    }catch(err){
        const error = new HttpError("Unable to add new user,please try again" ,500 )
        return next(error)
    }

    const newUser = new User({
     name,
     emailId,
     password:hashedPassword,
     image : req.file.path,
     address,
     phoneNumber,
     cname,
     gst
    })

    try{
      await newUser.save()
    }catch(err){
      const error = new HttpError("Unable to create the new User" , 404)
      return next(error)
  }

    let token;
    try{
    token = jwt.sign({userId : newUser.id , emailId : newUser.emailId},'supersecret_privatekey',{expiresIn:"1h"})
    }catch(err){
        const error = new HttpError("Unable to create the new User" , 404)
        return next(error)
    }

    res.status(201).json({userId : newUser.id , emailId : newUser.emailId,token:token})
   
  }

  exports.signUp = signUp
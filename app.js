const mongoose = require("mongoose")
const express = require("express")
const fs = require('fs')
const path = require('path')
const constants = require("./constants")
const HttpError = require("./model/httpError")
const bodyparser = require('body-parser')
const cors = require('cors')
const userRoutes = require("./routes/userRoutes")


const app = express()
   
app.use(bodyparser.json())

app.use(bodyparser.urlencoded({ extended: true }))

app.use(cors())

app.use("/user", userRoutes)

app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use((error, req, res, next) => {

        if(req.file){
             fs.unlink(req.file.path, err => {
                console.log(err);
             })
        }
      
        const { message, statusCode } = error

        if (res.headersent) {
                return next(error)
        }

        res.status(500 || statusCode)
        res.json({ message: message || "An Unexpected error occured" })
})

mongoose.connect(constants.CONNECTION_STRING)
        .then(() => app.listen(5000))
        .catch((err) => {
                const error = new HttpError("Connection failed", 500)
                console.log(error)
                throw error
        })
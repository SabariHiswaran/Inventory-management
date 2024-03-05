const mongoose = require("mongoose")
const express = require("express")
const { CONNECTION_STRING } = require("./constants")
const HttpError = require("./model/httpError")
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({ extended: true }))

app.use(cors())

app.use((error, req, res, next) => {
        const { message, statusCode } = error

        if (res.headersent) {
                return next(error)
        }

        res.status(500 || statusCode)
        res.json({ message: message || "An Unexpected error occured" })
})

mongoose.connect(CONNECTION_STRING)
        .then(() => app.listen(5000))
        .catch((err) => {
                const error = new HttpError("Connection failed", 500)
                throw error
        })
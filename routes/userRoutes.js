const express = require("express");

const { check } = require("express-validator");

const router = express.Router();

const userController = require("../controllers/userControllers");

const fileUpload = require("../middlewares/file-upload")

router.post(
  "/signUp",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("emailId").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  userController.signUp
);

module.exports = router;

var express = require("express");
var router = express.Router();
var path = require("path");
var userController = require("./../../controllers/user/userController.js")
var adminController = require("./../../controllers/admin/adminController.js")
const {check,body} = require("express-validator");
var rootDir = require("./../../util/path.js")

router.get("/",userController.GetHomePage);
router.get("/about",userController.GetAboutUsPage);
router.get("/schedule",userController.GetSchedulePage);
router.get("/contact_us",userController.GetContactUsPage);
router.get("/data/steps",userController.GetSteps);
router.post("/admin/subscribe",check("email").isEmail().normalizeEmail(),adminController.Subscribe)
router.post("/exit",userController.ExitOutOfModal);

module.exports = router;

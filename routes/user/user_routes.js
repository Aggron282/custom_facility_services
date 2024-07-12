var express = require("express");
var router = express.Router();
var path = require("path");
var userController = require("./../../controllers/user/userController.js")
var rootDir = require("./../../util/path.js")

router.get("/",userController.GetHomePage);
router.get("/about",userController.GetAboutUsPage);
router.get("/schedule",userController.GetSchedulePage);
router.get("/contact_us",userController.GetContactUsPage);
router.get("/data/steps",userController.GetSteps);

router.post("/",userController.GetScheduleData)
router.post("/exit",userController.ExitOutOfModal);

module.exports = router;

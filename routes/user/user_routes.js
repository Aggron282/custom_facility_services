var express = require("express");
var router = express.Router();
var path = require("path");
const {check,body} = require("express-validator");

var userController = require("./../../controllers/user/userController.js")
var userToOwnerController = require("./../../controllers/admin/user_to_owner_controller.js")
var rootDir = require("./../../util/path.js")

// Get Home Page
router.get("/",userController.GetHomePage);

// Get About Page
router.get("/about",userController.GetAboutUsPage);

// Get Schedule Page
router.get("/schedule",userController.GetSchedulePage);

// Get Contact Page
router.get("/contact_us",userController.GetContactUsPage);

// Get Page Data
router.get("/data/steps",userController.GetSteps);

// User Posts to Admin
router.post("/admin/subscribe",check("email").isEmail().normalizeEmail(),userToOwnerController.Subscribe)

// Exit Modals
router.post("/exit",userController.ExitOutOfModal);

module.exports = router;

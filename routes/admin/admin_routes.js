var express = require("express");
var router = express.Router();
var path = require("path");
var {check} = require("express-validator")

var rootDir = require("./../../util/path.js")
var adminController = require("./../../controllers/admin/admin_controller.js");
var authController = require("./../../controllers/admin/auth_controller.js");
var laborController = require("./../../controllers/admin/labor_controller.js");
var metaController = require("./../../controllers/admin/meta_controller.js");
var prospectController = require("./../../controllers/admin/prospect_controller.js");
var userToOwnerController = require("./../../controllers/admin/user_to_owner_controller.js");
var CheckAuth = require("./../../util/isAuth.js").CheckAuth;

// Get Home Page
router.get("/admin/",CheckAuth,adminController.GetIndexPage);
router.get("/admin/prospects_page=:prospect_page",CheckAuth,adminController.GetIndexPage);
router.get("/admin/prospects_page=:prospect_page",CheckAuth,adminController.GetIndexPage);
router.get("/admin/toggle=:isCompleted",CheckAuth,adminController.GetIndexPage);
router.get("/admin/toggle=:isCompleted&prospects_page=:prospect_page",CheckAuth,adminController.GetIndexPage);

// Get Prospect Pages
router.get("/admin/quotes",CheckAuth,prospectController.GetProspectPage);
router.get("/admin/quotes/toggle=:isCompleted",CheckAuth,prospectController.GetProspectPage);

// Get Prospect Data
router.get('/admin/prospects/all',prospectController.GetAllProspects);
router.get('/admin/prospects/weekly',prospectController.GetWeeklyProspects);

// Change Prospect Data
router.post("/admin/prospect/details",CheckAuth,prospectController.AddProspectDetails);
router.post("/admin/prospect/add",CheckAuth,prospectController.AddProspect);
router.post("/admin/sales",CheckAuth,prospectController.GetSales);
router.post("/admin/prospect/status",prospectController.ChangeProspectStatus);
router.post("/admin/prospect/delete",CheckAuth,prospectController.DeleteProspect);
router.post("/admin/prospect/completed/",
    check("miles").isLength({min:1}),
    check("hours").isLength({min:1}),
    check("date_completed").isLength({min:1})
,CheckAuth,prospectController.CompleteProspectJob);

// Change Page View
router.post("/admin/prospect/toggle",CheckAuth,prospectController.ToggleProspects);

// // Add Labor Data
router.post("/admin/add_laborer",CheckAuth,laborController.AddLaborer);

// Auth Routes
router.post("/auth/login",authController.Login);
router.get("/admin/auth/forgot",authController.ForgotKey);

// Get Login Page
router.get("/auth/login",authController.GetLoginPage);

// Meta Routes (Change)
router.post("/admin/browser",CheckAuth,metaController.AddBrowserView);
router.post("/admin/roots",CheckAuth,metaController.RootCount);

module.exports = router;

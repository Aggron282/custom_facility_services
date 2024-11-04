var express = require("express");
var router = express.Router();
var path = require("path");
var rootDir = require("./../../util/path.js")
var adminController = require("./../../controllers/admin/adminController.js");
var CheckAuth = require("./../../util/isAuth.js").CheckAuth;

router.get("/admin/",CheckAuth,adminController.GetIndexPage);
router.get("/admin/quotes",CheckAuth,adminController.GetQuotePage);
router.get("/admin/schedule",CheckAuth,adminController.ShowSchedule);
router.get("/auth/login",adminController.GetLoginPage);
router.post("/auth/login",adminController.Login);
router.post("/admin/edit/schedule",CheckAuth,adminController.EditSchedule);
router.post("/admin/edit/delete",CheckAuth,adminController.DeleteSchedule);
router.post("/admin/prospect/details",CheckAuth,adminController.AddProspectDetails);
router.post("/admin/prospect/add",CheckAuth,adminController.AddProspect);
router.post("/admin/prospect/delete",CheckAuth,adminController.DeleteProspect);
router.post("/admin/favorite",CheckAuth,adminController.MakeFavorite);
router.post("/admin/browser",CheckAuth,adminController.AddBrowserView);
router.post("/admin/delete_quotes",CheckAuth,adminController.DeleteQuotes);
router.post("/admin/roots",CheckAuth,adminController.RootCount);
router.post("/admin/completed_quotes",CheckAuth,adminController.CompleteQuotes);
router.post("/admin/add_laborer",CheckAuth,adminController.AddLaborer);
router.get("/admin/auth/forgot",adminController.ForgotKey);
module.exports = router;

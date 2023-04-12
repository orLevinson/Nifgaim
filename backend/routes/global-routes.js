const express = require("express");
const { check } = require("express-validator");

const globalController = require("../middlewares/global-controller");

const router = express.Router();

// accessible by everyone
router.get("/", globalController.getPerms);

// only admins able to preform this
// req : { perms : any[] }
router.post("/", [check("perms").isArray()], globalController.postPerms);

module.exports = router;

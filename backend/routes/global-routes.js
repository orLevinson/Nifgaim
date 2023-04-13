const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middlewares/check-auth");
const globalController = require("../middlewares/global-controller");
const authorizationController = require("../middlewares/authorization-controller");

const router = express.Router();

// accessible by everyone
router.get("/", globalController.getPerms);

// only admins able to preform this
router.use(checkAuth);

// req : { perm : any[] }
router.post(
  "/",
  [check("perm").isArray()],
  authorizationController.isAdmin,
  globalController.postPerms
);

module.exports = router;

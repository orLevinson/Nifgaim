const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middlewares/check-auth");
const attributesController = require("../middlewares/attributes-controller");
const authorizationController = require("../middlewares/authorization-controller");

const router = express.Router();

// accessible by everyone
router.get("/", attributesController.getAttributes);

// only admins able to preform this
router.use(checkAuth);

// add a new attribute
router.post(
  "/",
  authorizationController.isAdmin,
  [check("number").isNumeric()],
  attributesController.addAttribute
);

// change existing attribute
// can crash if name === ""
router.patch(
  "/:aid",
  authorizationController.isAdmin,
  [
    check("type").not().isEmpty(),
    check("children").isArray(),
    check("options").isArray(),
    check("width").not().isEmpty(),
  ],
  attributesController.changeAttribute
);

// delete a attribute
router.delete(
  "/:aid",
  authorizationController.isAdmin,
  attributesController.deleteAttribute
);

module.exports = router;

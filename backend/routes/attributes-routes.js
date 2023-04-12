const express = require("express");
const { check } = require("express-validator");

const attributesController = require("../middlewares/attributes-controller");

const router = express.Router();

// accessible by everyone
router.get("/", attributesController.getAttributes);

// only admins able to preform this

// add a new attribute
router.post(
  "/",
  [check("number").isNumeric()],
  attributesController.addAttribute
);

// change existing attribute
// can crash if name === ""
router.patch(
  "/:aid",
  [
    check("type").not().isEmpty(),
    check("children").isArray(),
    check("options").isArray(),
    check("width").not().isEmpty(),
  ],
  attributesController.changeAttribute
);

// delete a attribute
router.delete("/:aid", attributesController.deleteAttribute);

module.exports = router;

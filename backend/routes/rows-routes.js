const express = require("express");
const { check } = require("express-validator");

const rowsController = require("../middlewares/rows-controller");

const router = express.Router();

// each one can access only rows with his perms \ admins can access all
router.get("/", rowsController.getRows);

// add new rows
router.post(
  "/",
  [check("perm").isArray(), check("number").isNumeric()],
  rowsController.addRows
);

// change existing row
router.patch("/:rid", [check("perm").isArray()], rowsController.changeRow);

// delete a row
router.delete("/:rid", rowsController.deleteRow);

module.exports = router;

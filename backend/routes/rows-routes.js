const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middlewares/check-auth");
const rowsController = require("../middlewares/rows-controller");
const authorizationController = require("../middlewares/authorization-controller");

const router = express.Router();

// each one can access only rows with his perms \ admins can access all
router.use(checkAuth);

router.get("/", rowsController.getRows);

// add new rows
router.post(
  "/",
  authorizationController.canEdit,
  [check("perm").isArray(), check("number").isNumeric()],
  rowsController.addRows
);

// change existing row
router.patch(
  "/:rid",
  [check("perm").isArray()],
  authorizationController.canEdit,
  rowsController.changeRow
);

// delete a row
router.delete(
  "/:rid",
  authorizationController.canEdit,
  rowsController.deleteRow
);

module.exports = router;

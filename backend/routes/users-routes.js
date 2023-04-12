const express = require("express");
const { check } = require("express-validator");

const usersController = require("../middlewares/users-controller");

const router = express.Router();

// accessible by everyone
// req: {
// username : string;
// password : string;
// }
router.post(
  "/login",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  usersController.login
);

// accessible by everyone
// req: {
// username : string;
// password : string;
// perms : string[];
// name : string;
// }
router.post(
  "/register",
  check("username").not().isEmpty(),
  check("password").not().isEmpty(),
  check("perms").isArray(),
  check("name").not().isEmpty(),
  usersController.register
);

// only admins able to preform this
// get all the users
router.get("/", usersController.getUsers);

// alter a user
// req: {
// name : string;
// canEdit : boolean;
// perms : string[];
// isAdmin : boolean;
// }
router.patch(
  "/:uid",
  [
    check("name").not().isEmpty(),
    check("canEdit").isBoolean(),
    check("isAdmin").isBoolean(),
    check("perms").isArray(),
  ],
  usersController.patchUser
);

// delete a user
router.delete("/:uid", usersController.deleteUser);

module.exports = router;

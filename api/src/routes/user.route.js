const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.newUser);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;

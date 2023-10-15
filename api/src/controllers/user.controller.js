const factory = require("./handlerFactory");
const User = require("../models/user.model");

module.exports = {
  getUsers: factory.getAll(User),
  getOneUser: factory.getOne(User),
  newUser: factory.createOne(User),
  editUser: factory.updateOne(User),
  deleteUser: factory.deleteOne(User),
};


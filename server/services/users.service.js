const Users = require("../models/users.model");

function getUser(userId) {
  return Users.findById(userId);
}

async function createUser(body) {
  return Users.create(body);
}

function updateUser(userId, body) {
  return Users.findOneAndUpdate({ _id: userId }, body, {
    new: true,
  });
}

function deleteUser(userId) {
  return Users.findByIdAndDelete(userId);
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

const router = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers);
router.route("/").post(createUser);

router.route("/:userId").get(getUserById);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend);
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;

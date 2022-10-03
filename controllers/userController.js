const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((databaseUser) => {
        res.json(databaseUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((databaseUser) => {
        if (!databaseUser) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(databaseUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((databaseUser) => {
        res.json(databaseUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((databaseUser) => {
        if (!databaseUser) {
          return res.status(404).json({ message: "No user with id provided." });
        }
        res.json(databaseUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user (BONUS: and delete associated thoughts)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((databaseUser) => {
        if (!databaseUser) {
          return res.status(404).json({ message: "No user with id provided" });
        }

        return Thought.deleteMany({ _id: { $in: databaseUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and users thoughts deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((databaseUser) => {
        if (!databaseUser) {
          return res.status(404).json({ message: "No user with id provided" });
        }
        res.json(databaseUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((databaseUser) => {
        if (!databaseUser) {
          return res.status(404).json({ message: "No user with id provided." });
        }
        res.json(databaseUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
module.exports = userController;

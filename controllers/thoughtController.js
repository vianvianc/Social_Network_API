const { Thought, Reaction, User } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((databaseThought) => {
        res.json(databaseThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((databaseThought) => {
        if (!databaseThought) {
          return res.status(404).json({ message: "No thought with that Id!" });
        }
        res.json(databaseThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((databaseThought) => {
        if (!databaseThought) {
          return res.status(404).json({ message: "No thought with this Id" });
        }
        res.json(databaseThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtArray) => {
        return User.findOneAndUpdate(
          {
            _id: req.body.thoughtId,
          },
          {
            $push: { thoughts: thoughtArray._id },
          },
          {
            new: true,
          }
        );
      })

      .then(() => {
        res.json({ message: "Thought posted." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtArray) => {
        if (!thoughtArray) {
          return res
            .status(404)
            .json({ message: "No thought found with that id." });
        }
        return User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $pull: { thoughts: req.params.thoughtId },
          },
          {
            new: true,
          }
        );
      })

      .then(() => {
        res.json({ message: "Thought and thought reactions deleted." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $addToSet: {
          reactions: req.body,
        },
      },
      {
        new: true,
      }
    )
      .then((databaseReaction) => {
        if (!databaseReaction) {
          return res.status(404).json({ message: "No reaction with that Id" });
        }
        res.json(databaseReaction);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $pull: {
          reactions: { _id: req.params.reactionId },
        },
      },
      {
        new: true,
      }
    )
      .then((databaseReaction) => {
        if (!databaseReaction) {
          return res.status(404).json({ message: "No reaction with that id." });
        }
        res.json(databaseReaction);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
module.exports = thoughtController;

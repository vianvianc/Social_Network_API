const router = require("express").Router();
const {
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  getThoughtById,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts);
router.route("/").post(createThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought);
router.route("/:thoughtId").get(getThoughts);
router.route("/:thoughtId").put(getThoughtById);
router.route("/:thoughtId/reaction").post(addReaction);
router.route("/:thoughtId/reaction/:reactionId").post(deleteReaction);
module.exports = router;

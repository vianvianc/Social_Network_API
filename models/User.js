const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, "invalid email."],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
userSchema.virtual("friend_count").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;

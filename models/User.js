const { Schema, model } = require("mongoose");
const { User } = require(".");
const thoughtSchema = require("./Thought");

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
      match: /.+\@.+\..+/,
    },
    thoughts: [thoughtSchema],
    friends: [friendSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
const User = model('user', userSchema);

module.exports = User;
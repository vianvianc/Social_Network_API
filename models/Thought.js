const { Schema, model } = require('mongoose');
const formatDate = require("../utils/date");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {

    thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    },
    createdAt: {
    type: Date,
    default: Date.now(),
    get: (dateNow) => formatDate(dateNow),
    // Use a getter method to format the timestamp on query
    },
    username: { 
        
    type: String,
    required: true
    },
    reactions: [reactionSchema], 
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
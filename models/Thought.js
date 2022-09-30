const { Schema, model } = require('mongoose');

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
    // Use a getter method to format the timestamp on query
    },
    username: { 
        // (The user that created this thought)
    type: String,
    required: true
    }
reactions (These are like replies)
    Array of nested documents created with the reactionSchema
    }
)
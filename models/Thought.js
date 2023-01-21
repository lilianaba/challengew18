const { timeStamp, time } = require('console');
const { Schema, model, Types } = require('mongoose');
const {format_date } = require('../utils/helpers');


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
               
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default:Date.now,
        get:timeStamp=>format_date(timeStamp),
    },

  },
  {
    toJSON: {
        getter: true,
    },
}
);


//Schema to create user model:
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:timeStamp=> format_date(timeStamp),
            
        },
        username: {
            type: String,
            required: true,

        },
        reactions:  [
            reactionSchema  
            ],
    },
    {
        toJSON: {
            getter: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function (){
    const totalCount = this.reactions.length
    return totalCount;
  
  });



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;



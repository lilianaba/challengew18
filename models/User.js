const { Schema, model } = require('mongoose');

//Schema to create user model:

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],
        friends:  [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
    },
    {
        toJSON: {
            getter: true,
        },
    }
);


userSchema.virtual('friendCount').get(function (){
    const totalCount = this.friends.length
    return totalCount;
  
  });


const User = model('User', userSchema);
module.exports = User;

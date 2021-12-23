const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1)creating the userschema using mongoose
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A valid email is required'],
    unique: true,
    trim: true, //cut the unnecessary spaces before and after the email address
    lowercase: true, //converts the email address to the lowercase
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
    // validating if the password and confirmPassword is same or not
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      meassage: 'Password are not same!',
    },
  },
});

// 2)runs after user inputs the data and befor saving the data to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

// 3)creating the mongoose model for user
const User = mongoose.model('User', userSchema);

// 4)exporting the user model
module.exports = User;

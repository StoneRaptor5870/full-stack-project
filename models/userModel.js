import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'Please enter a name!'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email!'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please enter a password!'],
    minlength: [8, 'Password must be at least 8 characters long!'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    minlength: [8, 'Password must be at least 8 characters long!'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;

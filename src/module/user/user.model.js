import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt-nodejs';
import constants from '../../config/constants';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username must be unique'],
    minlength: [3, 'Username must equal or longer than 3'],
    maxlength: [120, 'Username must equal or shorter than 120'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must equal or longer than 6'],
    maxlength: [120, 'Password must equal or shorter than 120'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    maxlength: [120, 'Email must equal or shorter than 120'],
  },
  phone: {
    type: Number,
    trim: true,
    required: true,
    maxlength: [10, 'Phone must equal or shorter than 10'],
  },
  fullname: {
    type: String,
    required: true,
    maxlength: [80, 'Fullname must equal or shorter than 80'],
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  validatePassword(password) {
    return compareSync(password, this.password);
  },
  generateJWT(lifespan) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + lifespan);

    return jwt.sign(
      {
        _id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      },
      constants.JWT_SECRET,
    );
  },
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      password: this.password,
    };
  },
};

export default mongoose.model('User', UserSchema);

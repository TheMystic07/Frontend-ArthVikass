import { models , Schema } from "mongoose";
import mongoose  from 'mongoose';
// const Schema = mongoose.Schema;

const userSchema = new Schema({
  aadhar: {
    type: String,
    required: true,
    // match: /^[0-9]{12}$/
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    // match: /^[0-9]{10}$/
  },
  family: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
    default: 1
  },
  income: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  pan: {
    type: String,
    required: true,
    // match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  },
  dob: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});

const User = models.User || mongoose.model('User', userSchema);

export default User;

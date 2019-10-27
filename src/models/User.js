const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true
  },
  roles: [
    {
      type: String,
      require: true
    }
  ],
  linkedUsers: [
    {
      type: String,
      require: true
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

User.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

User.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  generateToken() {
    return jwt.sign({ id: this.id }, 'secret', {
      expiresIn: 86400
    });
  }
};

module.exports = mongoose.model('User', User);

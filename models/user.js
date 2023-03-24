const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { sendEmail } = require("../util");
const crypto = require("crypto");

/**
 *  CREATE USER MODEL EITHER FOR ADMIN OR CUSTOMER
 */

const User = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "'first_name' must be required"],
    },
    last_name: {
      type: String,
      required: [true, "'last_name' must be required"],
    },
    email: {
      type: String,
      unique: [true, "'email' must be unique"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    password: {
      type: String,
    },

 
  },
  { timestamps: true }
);

User.pre("save", function (next) {
  if (!this.password) this.password = process.env.DEFAULT_USER_PASSWORD;
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

User.statics.checkPassword = function (pass, hashedPass) {
  return bcrypt.compareSync(pass, hashedPass);
};

module.exports = mongoose.model("users", User);

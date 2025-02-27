const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Username is required"],
         unique: [true, "Username already exists"],
         trim: true,
      },
      password: {
         type: String,
         required: [true, "Password is required"],
      },
      admin: {
         type: Boolean,
         default: false
      }
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User

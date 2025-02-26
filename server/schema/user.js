const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Username is required"],
         unique: [true, "Username already exists"],
         trim: true,
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: [true, "Email already exists"],
         trim: true,
         match: [/.+\@.+\..+/, "Please enter a valid email address"],
      },
      password: {
         type: String,
         required: [true, "Password is required"],
      },
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User

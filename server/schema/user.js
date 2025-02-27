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
      },
      preferences: {
         genres: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Genre"
            }
         ],
         authors: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Author",
            }
         ]
      }
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User

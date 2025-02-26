const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Genre name is required"],
         unique: [true, "Genre already exists"],
         trim: true,
      },
   },
   { timestamps: true }
);

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre
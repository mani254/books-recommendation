const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Author name is required"],
         unique: [true, "Author already exists"],
         trim: true,
      },
   },
   { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author

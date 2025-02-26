const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: [true, "User is required"],
      },
      book: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Book",
         required: [true, "Book is required"],
      },
      comment: {
         type: String,
         required: [true, "Review comment is required"],
         trim: true,
      },
      rating: {
         type: Number,
         min: [0, "Rating must be at least 0"],
         max: [5, "Rating cannot exceed 5"],
         required: [true, "Rating is required"],
      },
   },
   { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review
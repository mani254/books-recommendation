import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, "Title is required"],
         unique: [true, "Title already exists"],
         trim: true,
         maxlength: [100, "Title should be less than 100 characters"],
      },
      overview: {
         type: String,
         required: [true, "Overview is required"],
         trim: true,
         maxlength: [200, "Overview should be less than 200 characters"],
      },
      description: {
         type: String,
         trim: true,
      },
      image: {
         type: String,
         required: [true, "Image URL is required"],
         trim: true,
      },
      publishedYear: {
         type: Number,
         required: [true, "Published Year is required"],
      },
      genre: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Genre",
         required: [true, "Genre is required"],
      },
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Author",
         required: [true, "Author is required"],
      },
   },
   { timestamps: true }
);

export default mongoose.model("Book", bookSchema);

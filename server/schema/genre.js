import mongoose from "mongoose";

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

export default mongoose.model("Genre", genreSchema);

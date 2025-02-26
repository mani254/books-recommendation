import mongoose from "mongoose";

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

export default mongoose.model("Author", authorSchema);

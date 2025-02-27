const Book = require("../schema/book");
const User = require("../schema/user");

const getRecommendedBooks = async (req, res) => {
   try {
      const userId = req.userId;

      const user = await User.findById(userId)
         .populate({ path: "preferences.authors" })
         .populate({ path: "preferences.genres" });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      if (!user.preferences || (!user.preferences.genres.length && !user.preferences.authors.length)) {
         return res.json({ recommendedBooks: [], message: "No preferences found for recommendations." });
      }

      const preferredGenres = user.preferences.genres.map((genre) => genre._id);
      const preferredAuthors = user.preferences.authors.map((author) => author._id);

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const recommendedBooks = await Book.find({
         $or: [
            { genre: { $in: preferredGenres } },
            { author: { $in: preferredAuthors } }
         ],
      })
         .populate("genre author")
         .skip(skip)
         .limit(limit);

      const totalRecommendedBooks = await Book.countDocuments({
         $or: [
            { genre: { $in: preferredGenres } },
            { author: { $in: preferredAuthors } }
         ],
      });

      res.json({
         recommendedBooks,
         totalItems: totalRecommendedBooks,
      });
   } catch (error) {
      console.error("Error fetching recommended books:", error);
      res.status(500).json({ message: "Server error, please try again." });
   }
};

module.exports = { getRecommendedBooks };

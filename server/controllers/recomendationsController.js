const Book = require("../schema/book");
const User = require("../schema/user");

const getRecommendedBooks = async (req, res) => {
   try {
      const userId = req.userId;

      // Fetch user and populate nested preferences correctly
      const user = await User.findById(userId)
         .populate({ path: "preferences.authors" })
         .populate({ path: "preferences.genres" });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      // Check if user has preferences
      if (!user.preferences || (!user.preferences.genres.length && !user.preferences.authors.length)) {
         return res.json({ recommendedBooks: [], message: "No preferences found for recommendations." });
      }

      // Extract preferred genres and authors
      const preferredGenres = user.preferences.genres.map((genre) => genre._id);
      const preferredAuthors = user.preferences.authors.map((author) => author._id);

      // Query for recommended books
      const recommendedBooks = await Book.find({
         $or: [
            { genre: { $in: preferredGenres } },
            { author: { $in: preferredAuthors } }
         ],
      })
         .populate("genre author")
         .limit(20);

      res.json({ recommendedBooks });
   } catch (error) {
      console.error("Error fetching recommended books:", error);
      res.status(500).json({ message: "Server error, please try again." });
   }
};

module.exports = { getRecommendedBooks };
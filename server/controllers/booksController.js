const booksService = require('../services/booksService')

const booksController = {
   async fetchBooks(req, res) {
      try {
         const { sortBy, sortOrder, page = 1, limit = 10 } = req.query;

         // Validation for sorting field
         const allowedSortFields = ["createdAt", "title", "publishedYear"];

         if (sortBy && !allowedSortFields.includes(sortBy)) {
            return res.status(400).json({ message: "Invalid sort field. Allowed fields: createdAt, title, publishedYear." });
         }

         // Validation for sorting order
         if (sortOrder && !["asc", "desc"].includes(sortOrder)) {
            return res.status(400).json({ message: "Invalid sort order. Allowed values: asc, desc." });
         }

         const pageNumber = parseInt(page, 10);
         const pageSize = parseInt(limit, 10);
         if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSize) || pageSize < 1) {
            return res.status(400).json({ message: "Page and limit must be valid positive numbers." });
         }

         const data = await booksService.fetchBooks(req.query);
         res.status(200).json({ message: "Books fetched successfully", books: data.books, totalItems: data.totalItems });
      } catch (err) {
         console.error("Error fetching books:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }
   },


};

module.exports = booksController;
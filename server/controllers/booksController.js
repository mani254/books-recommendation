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

   async fetchBook(req, res) {
      try {
         const { id } = req.params
         if (!id) {
            return res.status(401).json({ message: "invalid id" })
         }
         const book = await booksService.fetchBook(id)
         if (book) {
            return res.status(200).json({ book, message: 'Book fetched successfully' });

         }
         else {
            return res.status(404).json({ message: "Book not found" });

         }
      }
      catch (err) {
         console.error("Error fetching book:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }

   },

   async addBook(req, res) {
      try {
         const { title, overview, description, publishedYear, genre, author } = req.body

         if (!title || !overview || !publishedYear || !genre || !author) {
            return res.status(400).json({ message: "All fields are required (title, overview, description, publishedYear, genre, author)." });
         }

         // 2️⃣ Validate data types
         if (typeof title !== "string" || typeof overview !== "string" || typeof description !== "string") {
            return res.status(400).json({ message: "Title, overview, and description must be strings." });
         }

         if (!Number.isInteger(publishedYear) || publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
            return res.status(400).json({ message: "Published year must be a valid 4-digit number." });
         }

         if (!req.file) {
            return res.status(400).json({ message: "At least one image must be uploaded" });
         }

         req.body.image = req.file.path

         const book = await booksService.addBook(req.body)

         return res.status(200).json({ book, message: "Book added succesfully" })

      }
      catch (err) {
         console.error("Error adding books:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }
   },

   async deleteBook(req, res) {
      try {
         const { id } = req.params;
         if (!id) {
            return res.status(400).json({ message: "Book ID is required." });
         }

         const book = await booksService.deleteBook(id);
         if (book) {
            return res.status(200).json({ book, message: "book deleted succesfull" });
         }
      } catch (err) {
         console.error("Error deleting book:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }
   }

};

module.exports = booksController;
const Book = require('../schema/book')
const Genre = require('../schema/genre')
const Author = require('../schema/author')

const { ObjectId } = require("mongoose").Types;
const fs = require("fs");
const path = require("path");


class booksService {
   getMatchStage(query) {
      const { search } = query;
      let matchStage = {};

      if (search && search.trim() !== "") {
         matchStage.$or = [
            { title: { $regex: search, $options: "i" } },
         ];
      }

      return matchStage;
   }

   async fetchBooks(query) {
      try {
         const { sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 10, genre, author } = query;

         const fetchingOptions = {
            _id: 1, title: 1, overview: 1, "author.name": 1, "genre.name": 1, publishedYear: 1, createdAt: 1, image: 1
         };

         const pageNumber = parseInt(page, 10) || 1;
         const pageSize = parseInt(limit, 10) || 10;
         const skip = (pageNumber - 1) * pageSize;

         const matchStage = this.getMatchStage(query);

         const pipeline = [
            { $match: matchStage },
            {
               $lookup: {
                  from: "authors",
                  localField: "author",
                  foreignField: "_id",
                  as: "author"
               }
            },
            {
               $lookup: {
                  from: "genres",
                  localField: "genre",
                  foreignField: "_id",
                  as: "genre"
               }
            },
            {
               $unwind: { path: "$author", preserveNullAndEmptyArrays: true }
            },
            {
               $unwind: { path: "$genre", preserveNullAndEmptyArrays: true }
            },
            ...(author ? [{ $match: { "author.name": author } }] : []),
            ...(genre ? [{ $match: { "genre.name": genre } }] : []),
            {
               $facet: {
                  totalItems: [{ $count: "count" }],
                  books: [
                     { $sort: { [sortBy]: sortOrder === "desc" ? -1 : 1 } },
                     { $skip: skip },
                     { $limit: pageSize },
                     { $project: fetchingOptions }
                  ]
               }
            },
            {
               $project: {
                  totalItems: { $arrayElemAt: ["$totalItems.count", 0] },
                  books: 1
               }
            }
         ];

         const result = await Book.aggregate(pipeline);

         if (!result[0].totalItems) {
            return { totalItems: 0, books: [] };
         }
         return result[0] || { totalItems: 0, books: [] };

      } catch (error) {
         console.error("Error in book aggregation:", error);
         throw new Error(error.message);
      }
   }

   async fetchBook(id) {
      try {
         const book = await Book.findById(id)
         return book
      } catch (err) {
         console.log(err)
         throw new Error(err.message);
      }

   }

   async addBook(book) {
      try {
         const { genre, author } = book

         let existingGenre = await Genre.findOne({ name: genre });
         if (!existingGenre) {
            existingGenre = new Genre({ name: genre });
            await existingGenre.save();
         }


         let existingAuthor = await Author.findOne({ name: author });
         if (!existingAuthor) {
            existingAuthor = new Author({ name: author });
            await existingAuthor.save();
         }

         book.author = existingAuthor._id
         book.genre = existingGenre._id

         const newBook = await Book.create(book)

         return newBook

      }
      catch (error) {
         console.error("Error in adding product:", error);
         throw new Error(error.message);
      }
   }

   async deleteBook(id) {
      try {
         if (!ObjectId.isValid(id)) {
            throw new Error("Invalid book ID format.");
         }
         const book = await Book.findById(id);
         if (!book) {
            throw new Error("Book not found.");
         }
         if (book.image) {
            const imagePath = path.join(__dirname, "..", book.image);
            fs.unlink(imagePath, (err) => {
               if (err && err.code !== "ENOENT") {
                  console.error("Error deleting image:", err);
               }
            });
         }
         const delBook = await Book.findByIdAndDelete(id);
         return delBook
      } catch (err) {
         console.error("Error deleting book:", err);
         throw new Error(err.message);
      }
   }
}
module.exports = new booksService();
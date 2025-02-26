const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')

const createFileUploadMiddleware = require('../middleware/fileUploadMiddleware')
const uploadBookImage = createFileUploadMiddleware({
   storagePath: "./public/uploads/books",
   fileSize: 5 * 1024 * 1024,
   single: true,
   fieldName: "image",
   allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
});

router.get('/', booksController.fetchBooks)
router.get('/:id', booksController.fetchBook)

router.post('/', uploadBookImage, booksController.addBook)

router.delete('/:id', booksController.deleteBook);



module.exports = router
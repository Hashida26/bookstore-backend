const express= require("express")
const { getAllBooks, createBook, updateBook, getBookById, deleteBook } = require("../controllers/bookController")
const upload = require("../middlewares/upload")


const route=express.Router()
route.post('/', upload.single("image"),createBook)

route.get('/',getAllBooks)


// UPDATE BOOK (WITH IMAGE)
route.put(
  "/:id",
  upload.single("image"), // 🔥 THIS WAS MISSING
  updateBook
);

// DELETE
route.delete("/:id", deleteBook);

route.get('/:id',getBookById)



module.exports=route
const Book = require("../models/bookModel")




const createBook = async (req, res) => {
  try {
    //  Stop request if image not sent
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    

    }

    const bookData = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      publisher: req.body.publisher,
      publishYear: req.body.publishYear,
      stock: req.body.stock,
      rating: req.body.rating,
      pages: req.body.pages,
      language: req.body.language,

      /* ✅ image from multer
      image: `/uploads/books/${req.file.filename}`,*/
       //  Cloudinary image URL
      image: req.file.path,
    };

    const book = await Book.create(bookData);

    res.status(201).json({
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//read all data
const getAllBooks = async (req, res) => {
  try {
    const { category, language, minPrice, maxPrice } = req.query;

    let filter = {};

    // ✅ CASE-INSENSITIVE CATEGORY
    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    // ✅ CASE-INSENSITIVE LANGUAGE
    if (language) {
      filter.language = { $regex: `^${language}$`, $options: "i" };
    }

    // ✅ PRICE FILTER
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const books = await Book.find(filter);

    res.status(200).json({
      message: "Filtered book data fetched",
      data: books,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



//get book by id ,single view

const getBookById = async (req, res) => {
    try {
        const book =await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book found",
            data: book
        });

 } catch (error) {
        console.log(error.message);

 }
}

//update book

const updateBook = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE FILE:", req.file);

    const updateData = { ...req.body };

    
    if (req.file) {
      updateData.image = `/uploads/books/${req.file.filename}`;
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};



//delete book 
const deleteBook = async (req, res) => {
    try {
        const book =await  Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted",
            data: book
        });

 } catch (error) {
        console.log(error.message);

 }
}

module.exports={createBook,getAllBooks,getBookById,updateBook,deleteBook}






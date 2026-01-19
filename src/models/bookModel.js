const mongoose = require("mongoose");

const bookSchema=new mongoose.Schema(
    

  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      minlength: 10
    },

    price: {
      type: Number,
      required: true,
      min: 1
    },

    category: {
      type: String,
      required: true,
      enum: [
        "fiction",
        "non-fiction",
        "self-help",
        "education",
        "children",
        "history",
        "romance",
        "biography",
        "fantasy",
        "science"
      ]
    },

    publisher: {
      type: String,
      default: "Unknown Publisher"
    },

    publishYear: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear()
    },

    stock: {
      type: Number,
      required: true,
      default: 1,
      min: 0
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    pages: {
      type: Number,
      required: true,
      min: 1
    },

    language: {
      type: String,
     
    },
    image:{
      type:String,
      required:true
    }

   
  
  },

  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

    

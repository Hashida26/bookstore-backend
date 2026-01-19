const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary=require("../config/cloudinary")
//const path = require("path");


/* storage config only for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/books");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

 allow only images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });*/


// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bookstore/books",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 700, crop: "limit" }],
  },
});

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

module.exports = upload;

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoute = require("./routes/authRoute");
const bookRoute = require("./routes/bookRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

/* MIDDLEWARE  */

app.use(cors());
app.use(express.json());


app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/*  ROUTES */

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.use("/api/admin", adminRoute);

/*  404 HANDLER */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/*  GLOBAL ERROR HANDLER */

app.use((err, req, res, next) => {
  console.error("SERVER ERROR ", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;

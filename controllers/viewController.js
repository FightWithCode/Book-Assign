const Book = require("../models/booksModel.js");

// 1) Rendering loginpage
exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Login to get access",
  });
};

// 2) Rendering Signup page
exports.getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Register Yoursel !!",
  });
};

// 3) Rendering All books page
exports.getAllBooks = async (req, res) => {
  // 1) Get Books from collection
  const books = await Book.find();

  // 2) Render page
  res.status(200).render("main", {
    title: "All Books",
    books,
  });
};

// 4) Rendering each books Details
exports.getBookDetails = async (req, res) => {
  const book = await Book.findOne({ slug: req.params.slug });
  res.status(200).render("bookdetails", {
    book,
  });
};

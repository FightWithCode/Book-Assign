const Book = require("../models/booksModel");

exports.createNewBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json({
      status: "Success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      status: "Success",
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "Success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

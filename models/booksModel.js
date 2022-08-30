const mongoose = require("mongoose");
const slugify = require("slugify");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "The name must be unique, given name already exist"],
    required: [true, "A Book must have a name"],
  },
  imageUrl: {
    type: String,
    required: [true, `Please provide a link for book's Image`],
  },
  author: {
    type: String,
    required: [true, "Please specify the Author name"],
  },
  pages: {
    type: Number,
    required: [true, "Please specify the number of pages in the book"],
  },
  price: {
    type: Number,
    required: [true, "Please provide the MRP of the book"],
  },
  slug: String,
});

bookSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

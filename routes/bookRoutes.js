const express = require("express");
const booksController = require("../controllers/booksController");
const authController = require("../controllers/authController");

const router = express.Router();

// This middleware will protect all the routes as it is declared ABOVE ALL THE ROUTES
router.use(authController.protect);

router.get("/getallbooks", booksController.getAllBooks);
router.post("/createbook", booksController.createNewBook);

router
  .route("/:id")
  .get(booksController.getOneBook)
  .patch(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;

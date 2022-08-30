const express = require("express");
const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/getAllBooks", authController.protect, viewController.getAllBooks);
router.get(
  "/bookdetails/:slug",
  authController.protect,
  viewController.getBookDetails
);
// router.get('/updateBook', authController.protect, viewController.updateBook);
// router.get('/deleteBook', authController.protect, viewController.deleteBook);

module.exports = router;

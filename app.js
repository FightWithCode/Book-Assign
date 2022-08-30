const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const viewRouter = require("./routes/viewRoutes");
const booksRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Set security HTTP headers
app.use(helmet());

// rate-limiter implementation
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: "Too Many requestes from this IP, please try again in an hour",
});

app.use("/api", limiter);

// Body parser , reading data from req.body
app.use(express.json());
app.use(cookieParser());

// Data Sanitization against NoSQL query Injection
app.use(mongoSanitize());

// Data Sanitization against XSS(cross-site scripting)
app.use(xss());

// Template Engine Slection
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving Static file
app.use(express.static(path.join(__dirname, "public")));

// compression
app.use(compression());

// View Routes
app.use("/", viewRouter);
// books route
app.use("/api/v1/books", booksRouter);
// user Route
app.use("/api/v1/users", userRouter);

module.exports = app;

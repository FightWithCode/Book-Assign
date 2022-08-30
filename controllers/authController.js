const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// 1)SignUP
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1)Check if email and password is aleady exist
    if (!email || !password) {
      return res.status(400).json({
        status: "Error",
        error: "Please provide an email & a password",
      });
    }

    // 2)check if user exist & password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "Fail",
        error: "Incorrect email or password",
      });
    }

    // 3) if everything ok , send token to the client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) Get Token & check if its exits
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: "Error",
      error: "You are not logged in, please go on home page and login first",
    });
  }
  // 2) Validate the token i.e token is valid or not
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user already exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({
      status: "Error",
      Error: "The user No longer exist",
    });
  }
  // 4) if user change the password after jwt is issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: "Fail",
      error: "User Recently Changed the password ! Please Login Again",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
};

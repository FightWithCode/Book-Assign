import "@babel/polyfill";
import { signup, login } from "./signup";

// DOM ELEMENTS
const signupForm = document.getElementById("form");
const loginForm = document.getElementById("login-form");

// Delegations

if (signupForm)
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;
    const confirmPassword = document.getElementById("confpwd").value;

    signup(name, username, email, password, confirmPassword);
  });

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-pwd").value;

    login(email, password);
  });

import axios from "axios";
// import { showAlert } from "./alert";

export const signup = async (
  name,
  username,
  email,
  password,
  confirmPassword
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        username,
        email,
        password,
        confirmPassword,
      },
    });
    if (res.data.status === "success") {
      alert("Logges in successfully!");
      window.setTimeout(() => {
        location.assign("/getAllBooks");
      }, 1500);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      alert("signup in successfully!");
      window.setTimeout(() => {
        location.assign("/getAllBooks");
      }, 1500);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};

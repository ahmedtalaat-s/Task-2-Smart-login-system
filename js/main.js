// declare variables

let newUser = {};
let userName, userEmail, userPass;
const userNameInput = document.getElementById("nameInput");
const userEmailInput = document.getElementById("emailInput");
const userpassInput = document.getElementById("passInput");
const message = document.getElementsByClassName("message");
let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : {};
let currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : {};

// regex
const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[A-Za-z\d]{8,}$/;

$(document).ready(function () {
  // can not access profile directly without login
  let iswelcome =
    window.location.href == window.location.origin + "/profile.html";

  if (!localStorage.getItem("currentUser") && iswelcome) {
    window.location.href = "register.html";
  }
  // set profile content
  console.log(currentUser["userName"]);
  console.log(currentUser.userName);

  if (iswelcome) {
    $("#userContent").html(currentUser.userName);
    $("#emailContent").html(currentUser.userEmail);
    $("#passContent").html(currentUser.userPass);
  }
});

// check regex function for sign up
function checkRegex(input) {
  if (input == "name") {
    if (!userNameRegex.test(userNameInput.value)) {
      message[0].classList.remove("d-none");
    } else {
      message[0].classList.add("d-none");
    }
  } else if (input == "email") {
    if (!emailRegex.test(userEmailInput.value)) {
      message[1].classList.remove("d-none");
    } else {
      message[1].classList.add("d-none");
    }
  } else {
    if (!passwordRegex.test(userpassInput.value)) {
      message[2].classList.remove("d-none");
    } else {
      message[2].classList.add("d-none");
    }
  }
  if (
    !userNameRegex.test(userNameInput.value) ||
    !emailRegex.test(userEmailInput.value) ||
    !passwordRegex.test(userpassInput.value) ||
    userNameInput.value == "" ||
    userEmailInput.value == "" ||
    userpassInput.value == ""
  ) {
    $("button").attr("disabled", true);
  } else {
    $("button").removeAttr("disabled");
  }
}
// check regex function

// sign up function
function signUp() {
  if (users[userEmailInput.value]) {
    alert("The Email is already used try another one");
  } else {
    newUser["userName"] = userNameInput.value;
    newUser["userEmail"] = userEmailInput.value;
    newUser["userPass"] = userpassInput.value;
    users[userEmailInput.value] = newUser;
    localStorage.setItem("users", JSON.stringify(users));
    $("#register-succes").removeClass("d-none");
    userNameInput.value = "";
    userEmailInput.value = "";
    userpassInput.value = "";
    setTimeout(function () {
      window.location.href = "login.html";
    }, 1200);
  }
}
// sign up function

// check login inputs
function validateLogin() {
  if (userEmailInput.value == "" || userpassInput.value == "") {
    $("button").attr("disabled", true);
  } else {
    $("button").removeAttr("disabled");
  }
}
// check login inputs
// login function
function login() {
  if (
    users[userEmailInput.value] &&
    users[userEmailInput.value].userPass == userpassInput.value
  ) {
    localStorage.setItem(
      "currentUser",
      JSON.stringify(users[userEmailInput.value])
    );
    window.location.href = "profile.html";
  } else {
    $("#loginMsg").removeClass("d-none");
  }
}
// login function
// logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
// logout function

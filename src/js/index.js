"use strict";

const $ = document;
const registerBtn = $.querySelector(".register-btn");
const modal = $.querySelector(".modal");
const modalContent = $.querySelector(".modal-content");
const closeModalBtn = $.querySelector(".close-modal-btn");
const firstNameInput = $.querySelector(".firstname-input");
const lastNameInput = $.querySelector(".lastname-input");
const passwordInput = $.querySelector(".password-input");
const submitBtn = $.querySelector(".submit-btn");
const loader = $.querySelector(".loader");

registerBtn.addEventListener("click", e => {
  showModal();
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    hideModal();
  }
});

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1500);
});

closeModalBtn.addEventListener("click", () => {
  hideModal();
});

function showModal() {
  modal.classList.add("active");
}

function hideModal() {
  modal.classList.add("hide");
  setTimeout(() => {
    modal.classList.remove("active", "hide");
  }, 1000);
}

function clearForm() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  passwordInput.value = "";
}

// Register User and Save user data in firebase database
submitBtn.addEventListener("click", e => {
  e.preventDefault();

  let firstNameValue = firstNameInput.value.trim();
  let lastNameValue = lastNameInput.value.trim();
  let passwordValue = passwordInput.value.trim();

  // if user enter correct info add it
  if (firstNameValue && lastNameValue && passwordValue) {
    let userData = {
      firstname: firstNameValue,
      lastname: lastNameValue,
      password: passwordValue,
    };

    fetch("https://train-js-8d8d0-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(resp => {
        clearForm();
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    Swal.fire({
      title: "Error",
      text: "please enter correct value",
      icon: "error",
    });
  }
});

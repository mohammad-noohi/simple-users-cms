"use strict";
// ************************************** Elements ***************************************** //
const $ = document;
const usersWrapper = $.querySelector(".users");
// delete modal elements
const deleteUserModal = $.querySelector(".modal--delete-user");
const closeDeleteModalBtn = deleteUserModal.querySelector(".close-modal-btn");
const confirmDeleteUserBtn = deleteUserModal.querySelector(".confirm-btn");
const cancelDeleteUserBtn = deleteUserModal.querySelector(".cancel-btn");
// edit modal elements
const editUserModal = $.querySelector(".modal--edit-user");
const closeEditModalBtn = editUserModal.querySelector(".close-modal-btn");
const confrimEditUserBtn = editUserModal.querySelector(".confirm-btn");
const cancelEditUserBtn = editUserModal.querySelector(".cancel-btn");
const closeEditUserModalBtn = editUserModal.querySelector(".close-modal-btn");
// edit form inputs
const firstNameInput = editUserModal.querySelector(".firstname-input-edit");
const lastNameInput = editUserModal.querySelector(".lastname-input-edit");
const passwordInput = editUserModal.querySelector(".password-input-edit");
// back to previous page
const backLink = $.querySelector(".back-history");
// loader
const loader = $.querySelector(".loader");

// ************************************** Functions ***************************************** //

function usersGenrator() {
  fetch("https://train-js-8d8d0-default-rtdb.firebaseio.com/users.json")
    .then(resp => resp.json())
    .then(data => {
      let usersList = Object.entries(data);
      usersWrapper.innerHTML = "";
      usersList.forEach(user => {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="user" data-user-id="${user[0]}">
                <div class="user__pic">
                  <img src="./src/images/img_avatar2.png" alt="" />
                </div>
                <div class="user__info">
                  <h4 class="user__name">${user[1].firstname} ${user[1].lastname}</h4>
                  <h5 class="user__pass">pass : <span class="user__pass-value">${user[1].password}</span></h5>
                </div>
                <div class="user__actions">
                  <div class="user__edit-btn">edit</div>
                  <div class="user__delete-btn">delete</div>
                </div>
              </div>`
        );
      });
    })
    .finally(() => {
      hideLoader();
    });
}

function showDeleteUserModal() {
  deleteUserModal.classList.add("active");
}

function hideDeleteUserModal() {
  deleteUserModal.classList.add("hide");
  setTimeout(() => {
    deleteUserModal.classList.remove("active", "hide");
  }, 1000);
}

function hideEdituserModal() {
  editUserModal.classList.add("hide");
  setTimeout(() => {
    editUserModal.classList.remove("active", "hide");
  }, 1000);
}

function hideLoader() {
  // صرفا برای اینکه حالت لودینگ رو بهتر نمایش بدم از این روش رفتم
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1500);
}

// ************************************** Events ***************************************** //

backLink.addEventListener("click", () => {
  history.back();
});

closeDeleteModalBtn.addEventListener("click", e => {
  hideDeleteUserModal();
});

closeEditUserModalBtn.addEventListener("click", e => {
  hideEdituserModal();
});

cancelDeleteUserBtn.addEventListener("click", e => {
  hideDeleteUserModal();
});

cancelEditUserBtn.addEventListener("click", e => {
  hideEdituserModal();
});

window.addEventListener("load", e => {
  usersGenrator();
});

usersWrapper.addEventListener("click", e => {
  if (e.target.classList.contains("user__edit-btn")) {
    // edit user
    let userId = e.target.closest(".user").dataset.userId;
    editUserModal.classList.add("active");
    confrimEditUserBtn.addEventListener("click", e => {
      let firstNameValue = firstNameInput.value.trim();
      let lastNameValue = lastNameInput.value.trim();
      let passwordValue = passwordInput.value.trim();

      if ((firstNameValue, lastNameValue, passwordValue)) {
        let userData = {
          firstname: firstNameValue,
          lastname: lastNameValue,
          password: passwordValue,
        };

        fetch(`https://train-js-8d8d0-default-rtdb.firebaseio.com/users/${userId}.json`, {
          method: "PUT",
          headers: {
            "Contetn-type": "application/json",
          },
          body: JSON.stringify(userData),
        }).then(resp => {
          usersGenrator();
          hideEdituserModal();
          setTimeout(() => {
            Swal.fire({
              title: "user info edit successfully",
              icon: "success",
            });
          }, 1000);
        });
      } else {
      }
    });
  } else if (e.target.classList.contains("user__delete-btn")) {
    // delete user
    let userId = e.target.closest(".user").dataset.userId;
    showDeleteUserModal();
    confirmDeleteUserBtn.addEventListener("click", e => {
      fetch(`https://train-js-8d8d0-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: "DELETE",
      }).then(resp => {
        usersGenrator();
        hideDeleteUserModal();
      });
    });
  }
});

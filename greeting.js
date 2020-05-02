const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleUserSubmit(event) {
  event.preventDefault();
  const currentName = input.value;
  const modal = document.querySelector(".modal");
  const overlay = modal.querySelector(".modal_overlay");
  const closeBtn = modal.querySelector("span");
  const openModal = () => {
    modal.classList.remove("hidden");
  };
  const closeModal = () => {
    modal.classList.add("hidden");
  };
  if (currentName === "") {
    openModal();
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    return;
  }
  paintGreeting(currentName);
  saveName(currentName);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleUserSubmit);
}

function modifyName() {
  greeting.classList.remove(SHOWING_CN);
  askForName();
}

function paintGreeting(text) {
  const currentHours = new Date().getHours;
  const modifyBtn = document.createElement("button");
  modifyBtn.innerHTML = `<i class="fas fa-address-card"></i>`;
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  if (currentHours >= 6 && currentHours <= 12) {
    greeting.innerText = `Good Morning ${text}`;
  } else if (currentHours >= 12 && currentHours <= 24) {
    greeting.innerText = `Good Afternoon ${text}`;
  } else {
    greeting.innerText = `Good Evening ${text}`;
  }
  greeting.appendChild(modifyBtn);
  modifyBtn.addEventListener("click", modifyName);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();

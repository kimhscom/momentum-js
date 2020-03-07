const dateContainer = document.querySelector(".js-date");
dateTitle = dateContainer.querySelector("h1");

function getDate() {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const day = nowDate.getDate();
  dateTitle.innerText = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
}

function init() {
  getDate();
}

init();

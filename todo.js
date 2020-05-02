const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const finishedList = document.querySelector(".js-finishedList");
const trashIcon = document.querySelector(".trash");

const TODOS_LS = "toDos";
const FINISHED_LS = "finished";

let toDos = [];
let finished = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function clickTrashIcon() {
  const li = document.querySelectorAll("li");
  console.log(li);
  /*
  for (let i = 0; i < li.length; i++) {
    if (
      toDos[`${i}`].id === parseInt(li[`${i}`].id, 10) ||
      finished[`${i}`].id === parseInt(li[`${i}`].id, 10)
    ) {
      toDoList.removeChild(li[`${i}`]);
      finished.removeChild(li[`${i}`]);
    }
  }
  toDos = [];
  finished = [];
  saveToDos();
  saveFinished();
  */
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finished.filter(function (finish) {
    return finish.id !== parseInt(li.id);
  });
  finished = cleanFinished;
  saveFinished();
}

function handleFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const currentValue = li.querySelector("span").innerText;
  paintFinished(currentValue);
}

function handleToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const currentValue = li.querySelector("span").innerText;
  paintToDo(currentValue);
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "❌";
  finBtn.innerHTML = "✅";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.addEventListener("click", handleFinished);
  finBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const preBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + 1;
  delBtn.innerHTML = "❌";
  preBtn.innerHTML = "⏪";
  delBtn.addEventListener("click", deleteFinished);
  preBtn.addEventListener("click", handleToDo);
  preBtn.addEventListener("click", deleteFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(preBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId,
  };
  finished.push(finishedObj);
  saveFinished();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue === "") {
    return;
  }
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
    trashIcon.addEventListener("click", clickTrashIcon);
  }
}

function loadFinished() {
  const loadFinished = localStorage.getItem(FINISHED_LS);
  if (loadFinished !== null) {
    const parsedFinished = JSON.parse(loadFinished);
    parsedFinished.forEach(function (finish) {
      paintFinished(finish.text);
    });
  }
}

function init() {
  loadToDos();
  loadFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

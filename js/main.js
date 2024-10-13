let inputTask = document.querySelector(".input");
let submitTask = document.querySelector(".add");
let result = document.querySelector(".tasks");

//Empty array to store the tasks
let StoreTasks = [];

// cheack if tasks in local storage
if (localStorage.getItem("tasks")) {
  StoreTasks = JSON.parse(localStorage.getItem("tasks"));
}

//trigger function
getDataFromLocalStorage();
// add task
submitTask.onclick = function () {
  if (inputTask.value !== "") {
    addTaskToArray(inputTask.value);
    inputTask.value = ""; //empty input field
  }
};

result.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // remove task from local storage
    deleteTaskWithID(e.target.parentElement.getAttribute("data-id"));
    // remove task from page
    e.target.parentElement.remove();
  }

  //done task
  if (e.target.classList.contains("task")) {
    //toggle for complete task
    toggleStatusTaskWithID(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskValue) {
  // task data
  const task = {
    id: Date.now(),
    title: taskValue,
    completed: false,
  };
  StoreTasks.push(task); // add elemnts to store tasks
  addElementsToPageFrom(StoreTasks);
  addDataToLocalStorageFrom(StoreTasks);
}

function addElementsToPageFrom(StoreTasks) {
  //Empty results
  result.innerHTML = "";
  //looping on store tasks (array of tasks)
  StoreTasks.forEach((task) => {
    //create main div
    let div = document.createElement("div");
    div.className = "task";
    // cheack if task done
    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //create delete button
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    result.appendChild(div);
  });
}
//set local storage
function addDataToLocalStorageFrom(StoreTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(StoreTasks));
}
//get local storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWithID(taskId) {
  StoreTasks = StoreTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(StoreTasks);
}

function toggleStatusTaskWithID(taskId) {
  for (let i = 0; i < StoreTasks.length; ++i) {
    if (StoreTasks[i].id == taskId) {
      StoreTasks[i].completed === false
        ? (StoreTasks[i].completed = true)
        : (StoreTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(StoreTasks);
}

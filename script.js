const taskContainer = document.querySelector(".container");
const input = document.querySelector("#task-to-add");
const button = document.querySelector(".button");
const completedTasks = document.querySelector("#completed");
const totalTasks = document.querySelector("#total");
console.log(totalTasks);
let newTaskText = "";
let completedTasksNumber = 0;
let totalTasksNumber = localStorage.getItem("tasksNumber") || 0;
totalTasks.innerHTML = totalTasksNumber;
const changeTaskStatus = (event) => {
  // event.target.classList.toggle("done");
  if (event.target.classList.contains("done")) {
    event.target.classList.remove("done");
    completedTasksNumber--;
    totalTasksNumber--;
    localStorage.setItem("tasksNumber", totalTasksNumber);
  } else {
    event.target.classList.add("done");
    completedTasksNumber++;
    totalTasksNumber++;
    localStorage.setItem("tasksNumber", totalTasksNumber);
  }
  completedTasks.innerHTML = completedTasksNumber;
  totalTasks.innerHTML = totalTasksNumber;
};

const removeTask = (event) => {
  event.target.parentElement.parentElement.remove();
};

const createNewTask = () => {
  const task = document.createElement("div");
  task.innerHTML = `<div class="task">  
  <div class="checkbox not-done"></div>
  <p>Úkol</p>
  <i class="bin far fa-trash-alt"></i>
</div>`;
  taskContainer.appendChild(task);
  task.querySelector("p").innerHTML = newTaskText;
  const checkbox = task.querySelector(".checkbox");
  const bin = task.querySelector(".bin");
  checkbox.onclick = (event) => changeTaskStatus(event);
  bin.onclick = (event) => {
    if (confirm("Opravdu chceš úkol smazat?")) {
      removeTask(event);
    }
  };
  input.value = "";
};

button.onclick = () => {
  if (newTaskText !== "") {
    createNewTask();
  } else {
    alert("Vyplň políčko!");
  }
};

input.onkeyup = (e) => {
  newTaskText = e.target.value;
  if (e.keyCode === 13) {
    if (newTaskText !== "") {
      createNewTask();
    } else {
      alert("Vyplň políčko!");
    }
  }
}; 
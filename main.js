// On app load, get all tasks from localStorage
window.onload = loadTasks;

//generate id 
var counter = 0;


function loadTasks() {
  // check if localStorage has any tasks
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
      ${task.task}`;
    list.insertBefore(li, list.children[0]);
  });
}


// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});


function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if task is empty
  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }

  // First:    add task to local storage
 
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { id : counter++, task: task.value }]));


  // Second:   create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class ="check"> 
  ${task.value}`;
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = "";
}

// delete the complete task from list
function taskComplete(event) {
let ele = event.nextSibling;
ele.remove();
}

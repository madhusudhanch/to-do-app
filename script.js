const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

function updateTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");

    delBtn.addEventListener("click", () => {
      li.remove();
      updateTasks();
    });
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

addBtn.addEventListener("click", () => {
    let taskText = taskInput.value.trim();
    if (taskText == "") return;
    
    createTaskElement(taskText);
    taskInput.value = "";
    updateTasks();
});

loadTasks();
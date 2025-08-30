

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");


function createTaskElement(taskText) {
    
    const li = document.createElement("li");
    li.classList.add("task-item");

   
    const span = document.createElement("span");
    span.textContent = taskText;

   
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn");

   
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks(); 
    });

    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

   
    saveTasks();
}


addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = ""; 
    }
});


taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item span").forEach((span) => {
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach((task) => createTaskElement(task));
    }
}


loadTasks();
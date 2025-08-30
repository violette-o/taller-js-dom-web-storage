
// =============================
// 1. Selección de elementos principales del DOM
// =============================
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// =============================
// 2. Función para crear un elemento de tarea
// =============================
function createTaskElement(taskText) {
    // Crear elemento <li>
    const li = document.createElement("li");
    li.classList.add("task-item");

    // Crear span con el texto (para separar del botón)
    const span = document.createElement("span");
    span.textContent = taskText;

    // Crear botón de eliminar con solo "x"
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn");

    // Evento para eliminar tarea
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks(); // Guardar después de eliminar
    });

    // Agregar texto y botón al <li>
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Guardar después de agregar
    saveTasks();
}

// =============================
// 3. Evento para agregar una tarea
// =============================
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = ""; // limpiar campo
    }
});

// Permitir agregar con Enter
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// =============================
// 4. Guardar tareas en localStorage
// =============================
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item span").forEach((span) => {
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// =============================
// 5. Cargar tareas desde localStorage
// =============================
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach((task) => createTaskElement(task));
    }
}

// =============================
// 6. Cargar tareas al iniciar
// =============================
loadTasks();
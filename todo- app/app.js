const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const darkToggle = document.getElementById("darkModeToggle");
const addTaskBtn = document.getElementById("addTaskBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

// Add Task
function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
        alert("You must write something");
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        span.classList.toggle("checked", checkbox.checked);
        li.classList.toggle("checked", checkbox.checked);
        saveData();
    });

    const span = document.createElement("span");
    span.textContent = taskText;

    li.appendChild(checkbox);
    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from localStorage
function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";

    // Reattach checkbox listeners
    const checkboxes = listContainer.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const li = checkbox.parentElement;
            const span = li.querySelector("span");
            span.classList.toggle("checked", checkbox.checked);
            li.classList.toggle("checked", checkbox.checked);
            saveData();
        });
    });
}

// Dark Mode
darkToggle.addEventListener("change", function () {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Load Dark Mode Setting
window.addEventListener("load", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
        darkToggle.checked = true;
    }
    showTasks();
});

// Add Task on button click
addTaskBtn.addEventListener("click", addTask);

// Add Task on Enter key
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Clear All
clearAllBtn.addEventListener("click", () => {
    if (confirm("Clear all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
    }
});

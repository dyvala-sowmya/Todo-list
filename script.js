let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(filter === "active")
            return !task.completed;

        if(filter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach((task,index) => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    saveTasks();
}

document.getElementById("addBtn")
.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    taskInput.value = "";

    renderTasks();
});

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    renderTasks();
}

function editTask(index){

    let newText = prompt(
        "Edit Task",
        tasks[index].text
    );

    if(newText){

        tasks[index].text = newText;

        renderTasks();
    }
}

function filterTasks(type){
    renderTasks(type);
}

renderTasks();
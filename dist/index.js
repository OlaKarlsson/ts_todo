"use strict";
var task_status;
(function (task_status) {
    task_status[task_status["not_started"] = 0] = "not_started";
    task_status[task_status["in_progress"] = 1] = "in_progress";
    task_status[task_status["completed"] = 2] = "completed";
})(task_status || (task_status = {}));
const todo_list = document.querySelector("#todo_list");
//Can also be written as
const todo_form = document.getElementById("new_task_form");
const new_task_title = document.querySelector("#input_task_title");
const new_task_description = document.querySelector("#input_task_description");
const new_task_due_date = document.querySelector("#input_task_duedate");
const tasks = load_tasks();
refresh_list_on_screen();
todo_form === null || todo_form === void 0 ? void 0 : todo_form.addEventListener("submit", e => {
    e.preventDefault();
    let task_due = undefined;
    //Check that there's a title otherwise just return
    if ((new_task_title === null || new_task_title === void 0 ? void 0 : new_task_title.value) == "" || (new_task_title === null || new_task_title === void 0 ? void 0 : new_task_title.value) == null)
        return;
    if ((new_task_due_date === null || new_task_due_date === void 0 ? void 0 : new_task_due_date.value) == "" || (new_task_due_date === null || new_task_due_date === void 0 ? void 0 : new_task_due_date.value) == null) {
        task_due = undefined;
    }
    else {
        let date = new Date(new_task_due_date.value);
        task_due = date.toLocaleDateString('sv-SE');
    }
    const new_task = {
        id: Math.random().toString(16).slice(2),
        title: new_task_title.value,
        description: (new_task_description === null || new_task_description === void 0 ? void 0 : new_task_description.value) || "",
        due_date: task_due || undefined,
        status: task_status.not_started,
        created: new Date()
    };
    tasks.push(new_task);
    save_tasks();
    refresh_list_on_screen();
    todo_form === null || todo_form === void 0 ? void 0 : todo_form.reset();
});
function add_task_to_screen(task) {
    const list_item = document.createElement("li");
    const label = document.createElement("label");
    switch (task.status) {
        case task_status.in_progress:
            const end_btn = document.createElement("button");
            end_btn.textContent = "Mark as complete";
            end_btn.addEventListener("click", () => {
                console.log("Complete clicked");
                task.status = task_status.completed;
                save_tasks();
                refresh_list_on_screen();
            }, false);
            label.append(end_btn, task.title);
            break;
        case task_status.completed:
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = true;
            checkbox.disabled = true;
            label.append(checkbox, task.title);
            break;
        case task_status.not_started:
            const start_btn = document.createElement("button");
            start_btn.textContent = "Start task";
            start_btn.addEventListener("click", () => {
                console.log("Start clicked");
                task.status = task_status.in_progress;
                save_tasks();
                refresh_list_on_screen();
            }, false);
            label.append(start_btn, task.title);
            break;
    }
    list_item.append(label);
    const task_description = document.createElement("p");
    task_description.textContent = task.description;
    list_item.append(task_description);
    if (task.due_date !== undefined) {
        const time_due_date = document.createElement("time");
        time_due_date.textContent = task.due_date;
        list_item.append(time_due_date);
        console.log(task.due_date);
    }
    todo_list === null || todo_list === void 0 ? void 0 : todo_list.append(list_item);
}
function save_tasks() {
    console.log(tasks);
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function load_tasks() {
    let returnArray = [];
    let tasksJSON = localStorage.getItem("TASKS");
    if (tasksJSON)
        returnArray = JSON.parse(tasksJSON);
    return returnArray;
}
function clear_list_on_screen() {
    todo_list === null || todo_list === void 0 ? void 0 : todo_list.replaceChildren();
}
function add_list_to_screen() {
    tasks.forEach(add_task_to_screen);
}
function refresh_list_on_screen() {
    clear_list_on_screen();
    tasks.forEach(add_task_to_screen);
}
function get_status_text(task) {
    let status_text = "";
    switch (task.status) {
        case task_status.completed:
            status_text = "Completed";
            break;
        case task_status.not_started:
            status_text = "Not Started";
            break;
        case task_status.in_progress:
            status_text = "In progress";
            break;
        default:
            break;
    }
    return status_text;
}
//# sourceMappingURL=index.js.map
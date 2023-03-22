
enum task_status {
    not_started,
    in_progress,
    completed,
}

const list = document.querySelector<HTMLUListElement>("#todo_list");
//Can also be written as
const form = document.getElementById("new_task_form") as HTMLFormElement | null;
const new_task_title = document.querySelector<HTMLInputElement>("#input_task_title");
const new_task_description = document.querySelector<HTMLInputElement>("#input_task_description");
const new_task_due_date = document.querySelector<HTMLInputElement>("#input_task_duedate");


form?.addEventListener("submit", e => {
    e.preventDefault();

    if (new_task_title?.value == "" || new_task_title?.value == null) return;

    const task = {
        id: Math.random().toString(16).slice(2),
        title: new_task_title.value,
        description: new_task_description?.value || null,
        due_date: new_task_due_date?.value || null,
        status: task_status.not_started,
        completed: false,
        created: new Date()

    }

});

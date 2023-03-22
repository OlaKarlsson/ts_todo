"use strict";
const list = document.querySelector("#todo_list");
//Can also be written as
const form = document.getElementById("new_todo_form");
const new_title = document.querySelector("#txt_todo_title");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", e => {
    e.preventDefault();
    if ((new_title === null || new_title === void 0 ? void 0 : new_title.value) == "" || (new_title === null || new_title === void 0 ? void 0 : new_title.value) == null)
        return;
});
//# sourceMappingURL=index.js.map
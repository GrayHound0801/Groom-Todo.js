const $createBtn = document.getElementById("new");
const $list = document.getElementById("oneList");

let todos = [];

let createNewTodo = () => {
  const oneItem = {
    id: new Date().getTime(),
    text: "",
    complete: false,
  };

  todos.unshift(oneItem);

  const { itemEl, inputEl, editBtnEl, removeBtnEl } =
    createNewTodoElement(oneItem);

  $list.prepend(itemEl);

  inputEl.removeAttribute("disabled");
  inputEl.focus();
};

$createBtn.addEventListener("click", createNewTodo);

const createNewTodoElement = (oneItem) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item"); // div class="item"

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = oneItem.complete;
  checkbox.classList.add("checkbox");

  if (oneItem.complete) {
    itemEl.checkbox.classList.add("complete");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = oneItem.text;
  inputEl.setAttribute("disabled", "");
  inputEl.classList.add("text-input");

  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtnEl = document.createElement("button");
  editBtnEl.classList.add("edit-btn");
  editBtnEl.textContent = "수정";

  const removeBtnEl = document.createElement("button");
  removeBtnEl.classList.add("remove-btn");
  removeBtnEl.textContent = "삭제";

  itemEl.append(checkbox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
};

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

  saveToLocalStorage();
};

$createBtn.addEventListener("click", createNewTodo);

const createNewTodoElement = (oneItem) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item"); // div class="item"

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.checked = oneItem.complete;
  checkboxEl.classList.add("checkbox");

  if (oneItem.complete) {
    itemEl.classList.add("complete");
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

  checkboxEl.addEventListener("change", () => {
    oneItem.complete = checkboxEl.checked;

    if (oneItem.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }
    saveToLocalStorage();
  });

  inputEl.addEventListener("input", () => {
    oneItem.text = inputEl.value;
  });

  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    saveToLocalStorage();
  });

  editBtnEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });

  removeBtnEl.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.id !== oneItem.id);
    itemEl.remove();
    saveToLocalStorage();
  });

  itemEl.append(checkboxEl);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
};

const saveToLocalStorage = () => {
  const data = JSON.stringify(todos);

  localStorage.setItem("my-todos", data);
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("my-todos");

  if (data) {
    todos = JSON.parse(data);
  }
};

function displayTodos() {
  loadFromLocalStorage();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
    const { itemEl } = createNewTodoElement(item);
    $list.append(itemEl);
  }
}

displayTodos();

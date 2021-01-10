const todosForm = document.querySelector('.todosForm');
const todosInput = todosForm.querySelector('#todosInput');
const todosUl = document.querySelector('.todosList');
const warningMsg = document.querySelector('.warningMsg');

let todos;
const READY = 'ready';
const FINISHED = 'finished';

function handleTodosSubmit(e) {
    e.preventDefault();
    if (todos && todos.length + 1 > 3) {
        warningMsg.innerHTML = 'Up to 3 todos can be stored. Finish them FIRST!';
        setTimeout(function () {
            warningMsg.innerHTML = '';
        }, 2000);
        todosInput.value = '';
        return;
    }
    const obj = makeTodosObj(todosInput.value);
    if (!todos) todos = [];
    todos.push(obj);
    saveTodos();
    paintTodo(obj);
    todosInput.value = '';
    todosInput.focus();
}

function makeTodosObj(todoValue) {
    const todoObj = {
        id: String(Date.now()),
        text: todoValue,
        status: READY,
    };
    return todoObj;
}

function paintTodo(obj) {
    const todosMsg = document.querySelector('.todosMsg');
    todosMsg.classList.remove('hide');
    todosMsg.style.color = getRandomColor();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('item');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('click', checked);
    if (obj.status === FINISHED) {
        checkbox.checked = true;
        checkbox.classList.add('show');
    }
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    const todoLi = document.createElement('li');
    todoLi.id = obj.id;
    todoLi.innerHTML = obj.text;
    todoLi.classList.add('todo');
    if (obj.status === FINISHED) todoLi.classList.add('middleline');
    const removeBtn = document.createElement('div');
    removeBtn.addEventListener('click', removeItem);
    removeBtn.classList.add('removeBtn');
    todosUl.append(todoDiv);
    todoDiv.append(checkbox);
    todoDiv.append(todoLi);
    todoDiv.append(removeBtn);
}

function checked(e) {
    const target = e.target;
    const todoLi = target.nextSibling;
    if (todoLi.classList.contains('middleline')) {
        todoLi.classList.remove('middleline');
        target.classList.remove('show');
        todos.forEach(function (ele) {
            if (todoLi.id === ele.id) ele.status = READY;
        });
    } else {
        todoLi.classList.add('middleline');
        target.classList.add('show');
        todos.forEach(function (ele) {
            if (todoLi.id === ele.id) ele.status = FINISHED;
        });
    }
    saveTodos();
}

function removeItem(e) {
    const target = e.target;
    const todoLi = target.previousSibling;
    const item = target.parentNode;
    todos.forEach(function (ele, idx) {
        if (todoLi.id === ele.id) {
            item.remove();
            todos.splice(idx, 1);
        }
    });
    saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const arr = JSON.parse(localStorage.getItem('todos'));
    todos = arr;
    if (arr) {
        arr.forEach(function (ele) {
            paintTodo(ele);
        });
    }
}

function addTodos() {
    todosForm.addEventListener('submit', handleTodosSubmit);
}

function getRandomColor() {
    const randomColor = '#' + Math.round(Math.random() * 0xffffff).toString(16);
    return randomColor;
}

function init() {
    loadTodos();
    addTodos();
}

init();

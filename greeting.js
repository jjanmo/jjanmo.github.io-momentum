const greetingContainer = document.querySelector(".greetingContainer");
const greeting = greetingContainer.querySelector(".greeting");
const todosContainer = document.querySelector(".todosContainer");

const nameForm = document.querySelector(".nameForm"); //form tag
const nameInput = nameForm.querySelector("input"); //input tag

const nameDiv = document.querySelector(".nameDiv"); //div tag : name
const iconDiv = document.querySelector(".iconDiv"); //div tag : icon

// const mantra = "Remember who you are";
const msg = ["Good morning,", "Good afternoon,", "Good evening,"];

function setMessage() {
    const message = greeting.querySelector(".message");
    const now = new Date();
    if (now.getHours() >= 19 || now.getHours() < 6) message.innerHTML = msg[2];
    else if (now.getHours() >= 12) message.innerHTML = msg[1];
    else message.innerHTML = msg[0];
}

function saveName(name) {
    localStorage.setItem("userName", name);
}

function loadName() {
    const name = localStorage.getItem("userName");
    return name;
}

function handleNameSubmit(e) {
    e.preventDefault();
    const name = nameInput.value;
    saveName(name);
    paintGreeting(name);
}

function paintGreeting(name) {
    nameDiv.innerHTML = name;
    nameForm.classList.add("hide");
    greetingContainer.classList.remove("hide");
    todosContainer.classList.remove("hide");
    setMessage();
}

function handleNameEdit() {
    if (nameDiv.classList.contains("borderline")) {
        nameDiv.setAttribute("contenteditable", "false");
        nameDiv.classList.remove("borderline");
    } else {
        nameDiv.setAttribute("contenteditable", "true");
        nameDiv.classList.add("borderline");
        nameDiv.focus();
    }
}

function handleEnterKey(e) {
    if (e.keyCode === 13) {
        const newName = nameDiv.innerHTML;
        saveName(newName);
        nameDiv.setAttribute("contenteditable", "false");
        nameDiv.classList.remove("borderline");
        return false;
    }
}

function renewName() {
    nameDiv.addEventListener("keydown", handleEnterKey);
}

function editName() {
    iconDiv.addEventListener("click", handleNameEdit);
}

function startMomentum() {
    nameForm.addEventListener("submit", handleNameSubmit);
}

function init() {
    const name = loadName();
    if (!name) {
        nameInput.focus();
        startMomentum();
    } else paintGreeting(name);
    editName();
    renewName();
}

init();

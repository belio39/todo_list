var form = document.getElementById("myForm");
var textInput = document.getElementById("textInput");
console.log({ textInput: textInput });
var dateInput = document.getElementById("dateInput");
var textarea = document.getElementById("textarea");
var add = document.getElementById("add");
var msg = document.getElementById("msg");
var tasks = document.getElementById("tasks");
form.addEventListener("submit", function (e) {
    {
        e.preventDefault();
        console.log("you've clicked me");
        formValidation();
    }
});
var formValidation = function () {
    if (textInput.value === "") {
        console.log("Please all fields are required");
        msg.innerHTML = "Please all fields are required";
    }
    else {
        console.log("Success");
        msg.innerHTML = "";
        createData();
        add.setAttribute("data-bs-dismiss", "model");
        add.click();
        add.setAttribute("data-bs-dismiss", "");
    }
};
var data = [];
var createData = function () {
    data.push({
        title: textInput.value,
        description: textarea.value,
        date: dateInput.value
    });
    localStorage.setItem("data", JSON.stringify(data));
    createTodos();
};
var createTodos = function () {
    tasks.innerHTML = "";
    data.map(function (b) {
        tasks.innerHTML += "\n           <div>\n            <div>".concat(b.title, "</div>        \n            <div>").concat(b.description, "</div>\n            <div>").concat(b.date, "</div></div>\n\n            <span class=\"icons\">\n            <ion-icon onClick=\"editTodos(this)\" name=\"create-outline\"></ion-icon>\n            <ion-icon onClick=\"deleteTodos(this);createTodos()\" name=\"trash-outline\"></ion-icon>\n          </span>\n           </div>\n          ");
    });
    resetForm();
};
var deleteTodos = function (e) {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(">>>>>>>>", data);
};
var editTodos = function (e) {
    var selectedTodos = e.parentElement.parentElement;
    console.log(">>>>>>>>>>>", selectedTodos.children[0]);
    textInput.value = selectedTodos.children[0].innerHTML;
    dateInput.value = selectedTodos.children[1].innerHTML;
    textarea.value = selectedTodos.children[2].innerHTML;
    deleteTodos(e);
};
var resetForm = function () {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};
(function () {
    JSON.parse(localStorage.getItem("data") || "");
    console.log(">>>>>>>>>>>>", data);
    createTodos();
})();

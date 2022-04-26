const form = document.getElementById("myForm");
const textInput = document.getElementById(
  "textInput"
) as HTMLInputElement | null;

console.log({ textInput });

const dateInput = document.getElementById(
  "dateInput"
) as HTMLInputElement | null;
const textarea = document.getElementById("textarea") as HTMLInputElement | null;
const add = document.getElementById("add") as HTMLInputElement | null;
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");

form.addEventListener("submit", (e) => {
  {
    e.preventDefault();
    console.log("you've clicked me");
    formValidation();
  }
});

const formValidation = () => {
  if (textInput.value === "") {
    console.log("Please all fields are required");
    msg.innerHTML = "Please all fields are required";
  } else {
    console.log("Success");
    msg.innerHTML = "";
    createData();
    add.setAttribute("data-bs-dismiss", "model");
    add.click();

    add.setAttribute("data-bs-dismiss", "");
  }
};
const data = [];

const createData = () => {
  data.push({
    title: textInput.value,
    description: textarea.value,
    date: dateInput.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  createTodos();
};
const createTodos = () => {
  tasks.innerHTML = "";
  data.map((b: any) => {
    tasks.innerHTML += `
           <div>
            <div>${b.title}</div>        
            <div>${b.description}</div>
            <div>${b.date}</div></div>

            <span class="icons">
            <ion-icon onClick="editTodos(this)" name="create-outline"></ion-icon>
            <ion-icon onClick="deleteTodos(this);createTodos()" name="trash-outline"></ion-icon>
          </span>
           </div>
          `;
  });
  resetForm();
};

const deleteTodos = (e: any) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(">>>>>>>>", data);
};
const editTodos = (e: any) => {
  const selectedTodos = e.parentElement.parentElement;
  console.log(">>>>>>>>>>>", selectedTodos.children[0]);

  textInput.value = selectedTodos.children[0].innerHTML;
  dateInput.value = selectedTodos.children[1].innerHTML;
  textarea.value = selectedTodos.children[2].innerHTML;

  deleteTodos(e);
};

const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
(() => {
  JSON.parse(localStorage.getItem("data") || "");
  console.log(">>>>>>>>>>>>", data);
  createTodos();
})();

"use strict";

const api = new Api("url");

todoForm.title.addEventListener("input", (e) => validateField(e.target));
todoForm.title.addEventListener("blur", (e) => validateField(e.target));
todoForm.description.addEventListener("input", (e) => validateField(e.target));
todoForm.description.addEventListener("blur", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("input", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("blur", (e) => validateField(e.target));
todoForm.addEventListener("submit", onSubmit);

let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;

function validateField(field) {
  const { name, value } = field;

  let validationMessage = "";
  switch (name) {
    case "title": {
      if (value.length < 2) {
        titleValid = false;
        validationMessage = "Fältet 'Titel' måste vara minst 2 tecken";
      } else if (value.length > 100) {
        titleValid = false;
        validationMessage =
          "Fältet 'Titel' får inte innehålla mer än 100 tecken ";
      } else {
        titleValid = true;
      }
      break;
    }
    case "description": {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "Fältet 'Beskrivning' får ej innehålla mer än 500 tecken";
      } else {
        descriptionValid = true;
      }
      break;
    }
    case "dueDate": {
      if (value.length === 0) {
        descriptionValid = false;
        validationMessage = "Fältet 'Slutförd' är obligatorisk";
      } else {
        dueDateValid = true;
      }
      break;
    }
  }
  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove("hidden");
}

function onSubmit(e) {
  e.preventDefault();

  if (titleValid && descriptionValid && dueDateValid) {
    console.log("Submittsky");
    saveTask();
  }

  function saveTask() {
    const task = {
      title: todoForm.title.value,
      description: todoForm.description.value,
      dueDate: todoForm.dueDate.value,
      completed: false,
    };
    console.log(task);
  }
}

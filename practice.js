const addbtn = document.getElementById("addbtn");
const appbox = document.getElementById("appbox");
const clearbtn = document.getElementById("clearbtn");
//load notes
const loadNotes = () => {
  let parsed = JSON.parse(localStorage.getItem("notes") || "[]"); //If localStorage Value is falsy (null or undefined) then the JSON.parse will try to parse the empty array provided as a string(as stringified earlier)
  console.log("I am parsed array", parsed);
  parsed.forEach((element) => {
    createElement(element);
  });
};
// Save note
const saveNotes = () => {
  console.log("Notes Saved");
  const createdEl = document.querySelectorAll(".text-items");
  const newArray = Array.from(createdEl).map((element) => element.value);
  localStorage.setItem("notes", JSON.stringify(newArray));
  console.log(newArray);
  console.log(localStorage);
};
// Create Element
const createElement = (content) => {
  const newEl = document.createElement("textarea");
  newEl.className = "text-items";
  newEl.placeholder = "Empty note";
  newEl.value = content;
  appbox.appendChild(newEl);

  newEl.addEventListener("dblclick", () => {
    let ask = confirm("Are you sure you want to delete this note?");
    if (ask) {
      appbox.removeChild(newEl);
      saveNotes();
    }
  });
  newEl.addEventListener("input", saveNotes);
  return newEl;
};

// Add button
addbtn.addEventListener("click", () => {
  let El = createElement("");
  saveNotes();
});

// Clear button

const clearNotes = () => {
  const ask = confirm("This will clear all existing Notes, proceed?");
  if (ask) {
    localStorage.clear();
    location.reload();
  }
};
clearbtn.addEventListener("click", clearNotes);

// Load Notes on window load
window.addEventListener("DOMContentLoaded", () => {
  loadNotes();
});

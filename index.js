const addbtn = document.getElementById("addbtn");
const appbox = document.getElementById("appbox");

// load on reset
const loadNotes = () => {
  let savednotes = JSON.parse(localStorage.getItem("notes") || []);
  savednotes.forEach((element) => {
    loadel = createElement(element);
    appbox.prepend(loadel);
  });
};
// saveNotes to storage
const saveNotes = () => {
  let notevalues = document.querySelectorAll(".text-items");
  console.log(notevalues);
  const newArray = Array.from(notevalues).map((element) => element.value);
  localStorage.setItem("notes", JSON.stringify(newArray));
  console.log(localStorage);
  console.log(newArray);
};

// CreateElement
const createElement = (content) => {
  let newEl = document.createElement("textarea");
  newEl.classList.add("text-items");
  newEl.placeholder = "Empty Items";
  newEl.value = content;

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
// addnotes

addbtn.addEventListener("click", () => {
  clicksound.currentTime = 0;
  clicksound.play();
  let noteElement = createElement("");
  appbox.prepend(noteElement);
  saveNotes();
});

// Clear All
clearbtn.addEventListener("click", () => {
  console.log("Click");
  let ask = confirm("Are you sure, you want to clear all notes present?");
  if (ask) {
    localStorage.clear();
    location.reload();
  }
});
window.addEventListener("load", loadNotes);

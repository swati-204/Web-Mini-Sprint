const notesContainer = document.querySelector(".notes-container");
let createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; 
}

showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    const img = document.createElement("img");

    inputBox.classList.add("input-box");
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";

    notesContainer.appendChild(inputBox);
    inputBox.appendChild(img);

    updateStorage(); 
});

notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();  
    }
});

notesContainer.addEventListener("input", () => {
    updateStorage(); 
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

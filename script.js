const socket = io();

const editor =
document.getElementById("editor");

const users =
document.getElementById("users");

editor.addEventListener("input", () => {

    socket.emit(
        "text-change",
        editor.value
    );

});

socket.on("update-document", (data) => {

    editor.value = data;

});

socket.on("load-document", (data) => {

    editor.value = data;

});

socket.on("user-count", (count) => {

    users.textContent =
    `Users: ${count}`;

});
const express = require("express");

const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http);

app.use(express.static(__dirname));

let documentData = "";

let users = 0;

io.on("connection", (socket) => {

    users++;

    io.emit("user-count", users);

    console.log("User Connected");

    socket.emit(
        "load-document",
        documentData
    );

    socket.on("text-change", (data) => {

        documentData = data;

        socket.broadcast.emit(
            "update-document",
            documentData
        );

    });

    socket.on("disconnect", () => {

        users--;

        io.emit("user-count", users);

        console.log("User Disconnected");

    });

});

http.listen(3000, () => {

    console.log("Server Running On Port 3000");

});
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("command", (cmd) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                socket.emit("output", `Error: ${stderr}`);
            } else {
                socket.emit("output", stdout);
            }
        });
    });

    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(5000, () => console.log("Server running on port 5000"));


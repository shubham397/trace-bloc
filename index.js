var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const PORT = 3000;

app.get("/", function (req, res) {
  res.send("Home");
});

app.get("/client/:clientId", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(PORT, function () {
  console.log("listening on *:" + PORT);
});

io.on("connection", function (socket) {
  console.log("user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  socket.on("message-send-event", function (message) {
    io.emit("update-message" + message.to, message);
  });
});

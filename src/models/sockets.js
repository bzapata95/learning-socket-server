"use strict";
exports.__esModule = true;
var Sockets = /** @class */ (function () {
    function Sockets(io) {
        this.io = io;
        this.socketEvents();
    }
    Sockets.prototype.socketEvents = function () {
        var _this = this;
        this.io.on("connection", function (socket) {
            socket.on("new-message", function (data) {
                console.log(data);
                _this.io.emit("send-message-from-server", data);
            });
        });
    };
    return Sockets;
}());
exports["default"] = Sockets;

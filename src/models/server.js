"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var sockets_1 = require("./sockets");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1["default"]();
        this.port = process.env.PORT || 3333;
        // HTTP SERVER
        this.server = http_1.createServer(this.app);
        // CONFIG SOCKETS
        this.io = new socket_io_1.Server(this.server);
    }
    Server.prototype.middlewares = function () {
        // Deploy directory public
        this.app.use(express_1["default"].static(path_1["default"].join(__dirname, "..", "..", "public")));
    };
    Server.prototype.socketsConfigurations = function () {
        new sockets_1["default"](this.io);
    };
    Server.prototype.execute = function () {
        // init middlewares
        this.middlewares();
        // init socket
        this.socketsConfigurations();
        this.server.listen(this.port, function () {
            console.log("Is running");
        });
    };
    return Server;
}());
exports["default"] = Server;

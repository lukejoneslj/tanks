/* Tank hunt node.js server, basic start file */
var port = process.env.PORT || 8080;

var express = require("express");
var app = express();
var server = require("http").createServer(app);

var path = require("path");

// Only listen on port in local development
if (!process.env.VERCEL) {
    server.listen(port);
}

// Adjust paths for Vercel deployment
const isVercel = process.env.VERCEL;
const basePath = isVercel ? process.cwd() : path.resolve(__dirname + "/../..");

app.get("/", function(req, res) {
    res.sendFile(path.join(basePath, "built", "client", "index.html"));
});

app.get("/editor", function(req, res) {
    res.sendFile(path.join(basePath, "built", "client", "editor", "index.html"));
});

app.use("/client", express.static(path.join(basePath, "built", "client")));
app.use("/shared", express.static(path.join(basePath, "built", "shared")));

console.log("Node js server is now successfully listening at port " + port);
 
// Create game
var th = require("./scripts/TankHunt_SE");
var tankhunt = new th.TankHunt_SE(server);

// Export for Vercel
module.exports = app;

const express = require("express");
const config = require("./src/config");
const fileOp = require("./src/fileOperation");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "change url to get message" });
});

app.get("/write/:file/:content", (req, res) => {
  fileOp
    .write(req.params.file, req.params.content)
    .then((data) => res.json({ message: "write successful" }))
    .catch((err) => res.json({ message: "write unsuccessful" }));
});

app.get("/read/:file", (req, res) => {
  fileOp
    .read(req.params.file)
    .then((data) => res.json({ message: "read successful" }))
    .catch((err) => res.json({ message: "read unsuccessful" }));
});

app.get("/rename/:oldName/:newName", (req, res) => {
  fileOp
    .rename(req.params.oldName, req.params.newName)
    .then((data) => res.json({ message: "rename successful" }))
    .catch((err) => res.json({ message: "rename unsuccessful" }));
});

app.get("/remove/:file", (req, res) => {
  fileOp
    .remove(req.params.file)
    .then((data) => res.json({ message: "remove successful" }))
    .catch((err) => res.json({ message: "remove unsuccessful" }));
});

app.listen(config.port, config.hostname, () => {
  console.log(`server started at ${config.hostname}:${config.port} .`);
});

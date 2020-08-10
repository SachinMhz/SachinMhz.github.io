const http = require("http");
const fileOp = require("./fileOperation");

const HOSTNAME = "localhost";
const PORT = 8000;

const server = http.createServer(function (req, res) {
  console.log("client connected to server");
  // console.log("request url",req.url);
  // console.log("request method",req.method);

  /*
   * regardless of any URL and any method this callback block is executed
   * this call back will be executed when a client is connected to server
   * req or 1st argument is always a http request object
   * res or 2nd argument is always a http response object
   * developer's role => accept incoming request,process it and provide a meaningful response
   * req-res cycle must be completed otherwise the client will be waiting for response from server
   */

  let [_, operation, param1, param2] = req.url.split("/");
  if (req.url == "/") {
    res.end("you are on the home page");
  } else if (operation == "write") {
    fileOp
      .write(param1, param2)
      .then((data) => res.end("write operation successful"))
      .catch((err) => res.end("error writing file =>", err));
  } else if (operation == "read") {
    fileOp
      .read(param1)
      .then((data) => res.end("read operation successful"))
      .catch((err) => res.end("error reading file =>", err));
  } else if (operation == "rename") {
    fileOp
      .rename(param1, param2)
      .then((data) => res.end("rename operation successful"))
      .catch((err) => res.end("error renaming file =>", err));
  } else if (operation == "remove") {
    fileOp
      .remove(param1)
      .then((data) => res.end("remove operation successful"))
      .catch((err) => res.end("error removing file =>", err));
  } else {
    res.end("url not found");
  }
});

server.listen(PORT, HOSTNAME, function (err, done) {
  if (err) {
    console.log("error creating a server ");
  } else {
    console.log(`success creating a server at ${HOSTNAME}:${PORT}`);
  }
});

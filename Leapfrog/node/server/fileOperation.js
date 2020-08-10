const fs = require("fs");

function write(fileName, content) {
  return new Promise((res, rej) => {
    fs.writeFile(fileName + ".txt", content, function (err, done) {
      if (err) {
        rej("error writing file");
      } else {
        res("file written successfully");
      }
    });
  });
}

function read(fileName) {
  return new Promise((res, rej) => {
    fs.readFile(fileName + ".txt", function (err, done) {
      if (err) {
        rej("error reading file");
      } else {
        res("file read successfully");
      }
    });
  });
}

function rename(oldName, newName) {
  return new Promise((res, rej) => {
    fs.rename(oldName + ".txt", newName + ".txt", function (err, done) {
      if (err) {
        rej("error renaming file");
      } else {
        res("file renamed successfully");
      }
    });
  });
}

function remove(fileName) {
  return new Promise((res, rej) => {
    fs.unlink(fileName + ".txt", function (err, done) {
      if (err) {
        rej("error removing file");
      } else {
        res("file removed successfully");
      }
    });
  });
}

module.exports = {
  write,
  read,
  rename,
  remove,
};

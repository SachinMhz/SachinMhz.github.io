const fs = require("fs");

/**
 *
 * @param {string} fileName - name of the file (without extension) to be used
 * @param {string} content  - content to be filled in the fileName.txt
 */
function write(fileName, content) {
  return new Promise((res, rej) => {
    fs.writeFile("./output/" + fileName + ".txt", content, function (
      err,
      done
    ) {
      if (err) {
        rej("error writing file");
      } else {
        res("file written successfully");
      }
    });
  });
}

/**
 *
 * @param {string} fileName - name of the file that must be read
 */
function read(fileName) {
  return new Promise((res, rej) => {
    fs.readFile("./output/" + fileName + ".txt", function (err, done) {
      if (err) {
        rej("error reading file");
      } else {
        res("file read successfully");
      }
    });
  });
}

/**
 *
 * @param {string} oldName - name of the that is need to be renamed
 * @param {string} newName  -  new name for the oldName.txt
 */
function rename(oldName, newName) {
  return new Promise((res, rej) => {
    fs.rename(
      "./output/" + oldName + ".txt",
      "./output/" + newName + ".txt",
      function (err, done) {
        if (err) {
          rej("error renaming file");
        } else {
          res("file renamed successfully");
        }
      }
    );
  });
}

/**
 *
 * @param {string} fileName - name of the file that is need to be removed
 */
function remove(fileName) {
  return new Promise((res, rej) => {
    fs.unlink("./output/" + fileName + ".txt", function (err, done) {
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

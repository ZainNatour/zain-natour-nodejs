const { error } = require("console");
const fs = require("fs");
const fss = require("fs/promises");
const { stringify } = require("querystring");

let objectsPath = "config.json";
let filesArray = [];
// reading file paths from config.json object.
fs.readFile(objectsPath, (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    let filesObject = JSON.parse(data);
    filesArray = filesObject.files;
    // Reading files one by one.
    filesArray.forEach((fileName) => {
      fs.readFile(`${fileName}`, "utf8", (err, data) => {
        if (err) {
          console.log(`Error reading ${fileName}:`, err);
        } else {
          // convert from buffer format to string the removing spaces and newlines.
          const text = data.toString();
          const words = text.trim().split(/\s+|\n+/);
          //   word count in each file
          const wordCount = words.length;
          if (wordCount == 0) {
            console.log("The file is empty");
          } else {
            console.log(`File: ${fileName}: ${wordCount} words`);
          }
        }
      });
    });
  }
});

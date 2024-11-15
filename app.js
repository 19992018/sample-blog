// This file is not needed by/ connected to anny other
// I might delete it later
let ejs = require("ejs");
let paragraph = {
  pianistText: "We have a wide range of pianists ready to serve you",
  guitaristText: "We have a wide range of guitarists ready to serve you",
  recorderText: "We have a wide range of recorder players ready to serve you",
  violinistTextt: "We have a wide range of violinists ready to serve you",
};
ejs.render('<%= people.join(", "); %>', { paragraph: paragraph });

let ejs = require("ejs");
let paragraph = {
  pianistText: "We have a wide range of pianists ready to serve you",
  guitaristText: "We have a wide range of guitarists ready to serve you",
  recorderText: "We have a wide range of recorder players ready to serve you",
  violinistTextt: "We have a wide range of violinists ready to serve you",
};
ejs.render('<%= people.join(", "); %>', { paragraph: paragraph });

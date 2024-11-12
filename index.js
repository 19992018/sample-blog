require("dotenv").config(); // If you remember to, add the .env bit to your readme

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { Article } = require("./models/article.model.js");
const bodyParser = require("body-parser");
const path = require("path");
const db = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

// const { urlencoded } = require("body-parser");

const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
// use res.render to load up an ejs view file

// index page
//Where to find/get all articles
app.get("/", async function (req, res) {
  try {
    const articles = await Article.find();
    res.render("pages/index", { articles: articles });
    // res.status(200).json(Article);
  } catch (err) {
    console.log("error fetching posts", err);
    res.status(500).send("error fetching posts");
  }
});

//renders the create page
app.get("/create", function (req, res) {
  res.render("pages/create");
});

//at create page, we have set the form to post to / route
//so post method is userd to create
// we then res.redirect to home page, where all content is rendered
app.post("/", async function (req, res) {
  await Article.create({
    title: req.body.title,
    content: req.body.content,
  });
  res.redirect("/");
});

//Renders edit page
app.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("pages/edit", { article: article });
});

app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Received request to edit:", id);

    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID format");
      return res.status(400).send("Invalid ID format.");
    }

    //If id is valid, do this
    //explain this part
    const updatedArticle = await Article.findByIdAndUpdate(id, {
      title: req.body.title,
      content: req.body.content,
    });

    if (!updatedArticle) {
      console.log("Article not found");
      return res.status(404).send("Article not found.");
    }

    console.log("Update successful, redirecting...");
    res.redirect("/");
  } catch (error) {
    //Doesnt work
    res.status(500).send("There's an error", error);
  }
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  await Article.findByIdAndDelete(id);
  res.redirect("/");
});

// app.listen(3000, () => {
//   console.log("app running on port 3000... Yeey!");
// });

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     // app.listen(3000, () => {
//     //   console.log("app running on port 3000... Yeey!");
//     // });
//     console.log("successfully connected to database");
//   })
//   .catch(() => {
//     console.log("error connecting to database :-( ...");
//   });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })

  .catch((err) => console.log("Error connecting to database :-( ", err));

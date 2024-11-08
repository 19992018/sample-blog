

# the-paragraph
A blog website. Implemented using: HTML, CSS, JS, EJS, Mongo DB, Express and NodeJS
This sample blog is called The Paragraph


## How I maneouvered
### 1. Make a blog website using html and css.
(Ensure it has a create page)\
I had made a blog website using html and css a few years back. But I didn't connect it to a database. To put my CRUD skills to the test, I decided to add a database to the said website I made in 2022. In short, I already had the html and css. All I added was a create page to enable me or a user to create a post. 


### 2. Create an EJS folder
Earlier this year, I had tried to integrate EJS into the project, but I seemingly didn't have enough knowledge. Initially, I had installed ejs but I was implementing it in an app.js folder. This didn't work because "main" in the package.json is normally set to "index.js". I also didn't have a "views" folder, "pages" and "partials" subfolder. In addition, I had not set up my express server! So this is how I got it to work:

a. npm i ejs\
b. in index.js, set up an express server\
here you will eventually:

- require ejs
- set the view engine to ejs

app.set('view engine', 'ejs')

- res.render one of your ejs pages

c. create a views folder\
under it create a pages sub-folder and a partials-subfolder\
d. create your ejs files\
your ejs files are based on your html.\
e.cut and paste the header of your website into patials/header.ejs; footer into partials/footer.ejs and so on.\
f. you can test whether ejs is working by following one of the many ejs tutorials on the internet\
just try to ensure a const in index.ejs is being displayed on your browser\
g. further testing will be done once you implement mongodb in your project\
h. create a public folder\
It is important to note that at this point -when you're testing- your css won't be reflected.\
This is where the public folder comes in.\
Cut your css file from wherever it is and paste it into the public folder.\
in your header.ejs, adjust the link to be *relative by adding a foward slash at its beginning\
At this point when you test your html and css should display just fine.\

### 3. Mongo DB/Mongoose
a. We of course start by npm installing 'mongoose' and 'mongo db'\
b. Require mongoose in index.js\
c. Create a database in cloud.mongodb.com\
d. Connect to the database in index.js\

mongoose
  .connect(MONGO_URL)\
  .then(() => {\
    console.log("successfully connected to database");
  })\
  .catch(() => {\
    console.log("error connecting to database :-( ...");\
  });

  (In place of MONGO_URL you may use the actual connection string obtained from cloud.mongodb.com\
  Though it's advisable to use the variable MONGO_URL and store the connection string in a .env file\
  We'll talk about .env later)

  e. Create a models folder\
  f. create the relevant file(s) in this case model.article.js
  g. create your schema in that file. Your model variable as well. Export schema variable.

  //require\
const mongoose = require("mongoose");\

//create schema\
const ArticleSchema = mongoose.Schema(\
  {\
    title: {\
      type: String,\
      //   required: true,\
    },\
    content: {
      type: String,\
      //   required: true,\
    },\
  },\
  {
    timestamps: true,
  }\
);

//create model\
const Article = mongoose.model("Article", ArticleSchema);\

//export model\
module.exports = { Article };

h. Import the schema you created in model file into index.js\
g. Now you're ready to merge Mongoose and EJS.

### 4. Merging EJS with Mongoose (+ express)
First ensure these two lines are in your code:\

app.use(express.json());\
app.use(bodyParser.urlencoded({ extended: true }));

body-parser is importaant because: body-parser is essential for handling incoming data in a variety of formats, such as JSON, URL-encoded form data, and raw or text data. It transforms this data into a readable format under req. body for easier processing in your application.

After those two lines are in place, the code below will work

```
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
```

  NB: Don't mind the front-end. This project started out as a front-end project but became a backend practice platform. I might make updates to the frontend later  


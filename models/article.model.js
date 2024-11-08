//require
const mongoose = require("mongoose");

//create schema
const ArticleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      //   required: true,
    },
    content: {
      type: String,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

//create model
const Article = mongoose.model("Article", ArticleSchema);

//export model
module.exports = { Article };

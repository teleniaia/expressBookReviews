const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)){
        users.push({"username":username, "password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    } else {
        return res.status(208).send("Incorrect Login. Check credentials");

  }});// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
    }
    });
    res.send(JSON.stringify({booksbyauthor}, 4));
    });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let booksbytitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
        if(books[isbn]["title"] === req.params.title) {
             booksbytitle.push({"isbn":isbn,
                              "title":books[isbn]["title"],
                              "reviews":books[isbn]["reviews"]});
    }
});
     res.send(JSON.stringify({booksbytitle}, null, 4));
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let booksbyreview = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
        if(books[isbn]["reviews"] === req.params.title) {
             booksbyreview.push({"isbn":isbn,
                              "title":books[isbn]["title"],
                              "reviews":books[isbn]["reviews"]});
    }
});
     res.send(JSON.stringify({booksbyreview}, null, 4));
});

module.exports.general = public_users;

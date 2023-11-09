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
    }
      return res.statif (authenticatedUser(username,password)); {
        let accessToken = jwt.sign({
            data: password
          }, 'access', { expiresIn: 60 * 20 });
          req.session.authorization = {
            accessToken, username
  
        }
        return res.status(200).send("Customer successfully logged in");
      } else {
        return res.status(208).send("Incorrect Login. Check credentials");
      }us(404).json({message: "Unable to register user."});
  });// Get the book list available in the shop
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
                              "title":books[title]["title"],
                              "reviews":books[title]["reviews"]});
    }
});
     res.send(JSON.stringify({booksbytitle}, null, 4));
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {

    const isbnParam = req.params.isbn;

    // Get the book reviews based on ISBN provided in the request parameters

    const reviews = books[isbnParam];

    if (!reviews) {

      res.status(404).json({ message: 'No reviews found for the ISBN provided' });

    } 

    




    

});
module.exports.general = public_users;

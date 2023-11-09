const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
      let userwithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userwithsamename.length > 0){
        return true;
     } else {
        return false;
      }
    }
const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in record
    let validatedusers = users.filter((user)=>{
        return(user.username === username && user.password === password)
    });
    if(validatedusers.length > 0){
         return true;
     }   else {
         return false;
        }
    }

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password){
      return res.status(404).json({message:"Unable to Login"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 20 });
      req.session.authorization = {
        accessToken, username

    }
    return res.status(200).send("Customer successfully logged in");
  } else {
    return res.status(208).send("Incorrect Login. Check credentials");
  }
  });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
 
    const isbn = req.params.isbn;
    const review = req.query.review;
    const user = req.session.authorization["username"];

    books[isbn]["reviews"][user] =review;
    
    res.send(isbn + " new review added!" + user + ":" + review)
});

// delete book review
regd_users.delete("/auth/review/:isbn", (req, res)=>{
    const isbn = req.params.isbn;
    const user = req.session.authorization["username"];
    delete books[isbn]["reviews"][user];
    res.send("delete success!" + books[isbn]["reviews"])
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

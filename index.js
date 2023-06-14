const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// basic data storage
let books = [];


// basic hello world
app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});

// post - add a new book
app.post('/api/books/:title/:author', (req, res) => {
    const title = req.params.title; 
    const author = req.params.author; 
    const newBook = {};

    newBook.title = title;
    newBook.author = author;
    books.push(newBook);

    res.send('Book created successfully!');
});

// put - update existing book
app.put('/api/books:id', (req, res) => {
    const bookID = req.params.id;
    const updatedBook = req.body;

    // find book from the array
    const bookToUpdate = books.find((book) => book.id === bookID);
    if(bookToUpdate)
    {
        // update book
        bookToUpdate.title = updatedBook.title || bookToUpdate.title;
        bookToUpdate.author = updatedBook.author || bookToUpdate.author;

        res.send('Book updated successfully!');
        console.log(books);
    } else {
        res.status(404).send('Book not found!');
    }

});

// server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
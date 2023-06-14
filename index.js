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
app.post('/api/books', (req, res) => {
    const newBook = req.body;

    books.push(newBook);

    res.send('Book created successfully!');
})





// server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
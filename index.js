const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// example commands
// http://localhost:3000/api/hello (browser)

// curl -X POST http://localhost:3000/api/books/Emma/Jane%20Austen
// curl -X POST http://localhost:3000/api/books/El%20Aleph/Borjes

// curl -X PUT -H "Content-Type: application/json" -d "{\"title\":\"Persuasion\",\"author\":\"Austen\"}" http://localhost:3000/api/books/1
// curl -X PUT -H "Content-Type: application/json" -d "{\"title\":\"Pride And Prejudice\"}" http://localhost:3000/api/books/1


// simple id 
let counter = 1;

// simple data storage
// starting server with 1 entry
let books = [
    {
      id: 0,
      title: "Ficciones",
      author: "Jorge Luis Borges"
    }
];

const logBooks = () => {
    for(let i = 0; i<books.length; i++){
        console.log(`${books[i].id} ${books[i].title}, ${books[i].author}`);
    }
}
const generateUniqueId = () => {
  return counter++;
}


// basic hello world
app.get('/api/hello', (req, res) => {
    res.send(`${books[0].title}, ${books[0].author}`);
});

// post - add a new book
app.post('/api/books/:title/:author', (req, res) => {
    console.log("add book");
    const title = req.params.title; 
    const author = req.params.author; 
    const newBook = { title, author };

    newBook.id = generateUniqueId();

    books.push(newBook);

    res.send('Book created successfully!');
    logBooks();
});

// put - update existing book
app.put('/api/books/:id', (req, res) => {
    console.log("edit book");
    
    const bookID = parseInt(req.params.id);   
    const { title, author } = req.body;

    console.log(`book id: ${bookID}`)
    console.log(`new book :${title}, ${author}`)

    // find book from the array
    const bookToUpdate = books.find((book) => bookID === books.indexOf(book));
    if (bookToUpdate) {
        // update book
        bookToUpdate.title = title || bookToUpdate.title;
        bookToUpdate.author = author || bookToUpdate.author;

        res.send('Book updated successfully!');       
    } else {
        res.status(404).send('Book not found!');
    }
    logBooks();
});

// delete - remove a book
app.delete('/api/books/:id', (req, res) => {
    console.log("delete book");
  
    const bookID = req.params.id;
  
    // Find the index of the book with the given ID in the array
    const bookIndex = books.findIndex((book) => book.id === bookID);
  
    if (bookIndex !== -1) {
      // Remove the book from the array
      books.splice(bookIndex, 1);
  
      res.send('Book deleted successfully!');
      console.log(books);
    } else {
      res.status(404).send('Book not found!');
    }
  
    logBooks();
  });


// server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


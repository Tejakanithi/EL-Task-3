const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: "Wings of Fire", author: "A. P. J. Abdul Kalam" },
    { id: 2, title: "The Guide", author: "R.K. Narayan" }
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        res.json(book);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);
    res.json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
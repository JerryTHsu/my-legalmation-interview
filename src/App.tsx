// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Authors from './pages/AuthorsPage';
import Author from './pages/EditAuthorPage';
import Books from './pages/BooksPage';
import Book from './pages/EditBookPage';
import AddBookPage from './pages/AddBookPage';
import AddAuthorPage from './pages/AddAuthorPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/authors/:id" element={<Author />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/add-author" element={<AddAuthorPage />} />
                <Route path="/add-book" element={<AddBookPage />} />
            </Routes>
        </Router>
    );
};

export default App;

// src/pages/BooksPage.tsx

import React from 'react';
import Nav from '../components/Nav';
import BookList from '../components/BooksList.tsx';

/**
 * Page to display the list of books
 */
const BooksPage: React.FC = () => {
    return (
        <div>
            <Nav />
            <BookList />
        </div>
    );
};

export default BooksPage;

// src/pages/AddBookPage.tsx

import React from 'react';
import Nav from '../components/Nav';
import AddBookForm from '../components/AddBookForm';

/**
 * Page to add a new book
 */
const AddBookPage: React.FC = () => {
    return (
        <div>
            <Nav />
            <AddBookForm />
        </div>
    );
};

export default AddBookPage;

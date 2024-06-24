// src/pages/EditBookPage.tsx

import React from 'react';
import Nav from '../components/Nav';
import EditBookForm from '../components/EditBookForm';

/**
 * Page to add a new book
 */
const AddBookPage: React.FC = () => {
    return (
        <div>
            <Nav />
            <EditBookForm />
        </div>
    );
};

export default AddBookPage;

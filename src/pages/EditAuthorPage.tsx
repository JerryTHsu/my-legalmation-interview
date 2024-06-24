// src/pages/EditBookPage.tsx

import React from 'react';
import Nav from '../components/Nav';
import EditAuthorForm from '../components/EditAuthorForm';

/**
 * Page to add a new book
 */
const AddBookPage: React.FC = () => {
    return (
        <div>
            <Nav />
            <EditAuthorForm />
        </div>
    );
};

export default AddBookPage;

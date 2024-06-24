// src/pages/AddAuthorPage.tsx

import React from 'react';
import Nav from '../components/Nav';
import AddAuthorForm from '../components/AddAuthorForm';

/**
 * Page to add a new author
 */
const AddAuthorPage: React.FC = () => {
    return (
        <div>
            <Nav />
            <AddAuthorForm />
        </div>
    );
};

export default AddAuthorPage;

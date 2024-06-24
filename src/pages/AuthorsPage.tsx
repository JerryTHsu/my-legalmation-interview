// src/pages/AuthorsPage.tsx

import React from 'react';
import Nav from '../components/Nav';
import AuthorList from '../components/AuthorList';

/**
 * Authors page component
 */
const AuthorsPage: React.FC = () => {
    return (
        <div>
            <Nav />
            <AuthorList />
        </div>
    );
};

export default AuthorsPage;

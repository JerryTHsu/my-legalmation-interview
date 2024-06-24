// src/pages/HomePage.tsx

import React from 'react';
import Nav from '../components/Nav';

/**
 * Home page component
 */
const HomePage: React.FC = () => {
    return (
        <div>
            <Nav />
            <h1>Welcome to the Book Management App</h1>
            <p>Navigate through the menu to manage authors and books.</p>
        </div>
    );
};

export default HomePage;

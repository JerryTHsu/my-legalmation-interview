// src/components/Nav.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the navigation bar
const Navbar = styled.nav`
    background-color: #343a40;  // A dark gray background
    color: #fff;                // White text color
    padding: 0.8rem;            // Padding around the navigation bar
    display: flex;              // Flexbox for horizontal layout
    justify-content: center;    // Center the navigation links
`;

const NavItem = styled(Link)`
    color: #fff;                  // White text for links
    margin: 0 10px;               // Margin between links
    text-decoration: none;       // No underline on links

    &.active {                    // Style for the active route
        font-weight: bold;          // Bold text for active link
        text-decoration: underline; // Underline the active link
    }

    &:hover {                     // Hover effect
        text-decoration: underline; // Underline on hover
    }
`;

const Nav: React.FC = () => {
    return (
        <Navbar>
            <NavItem to="/">
                Home
            </NavItem>
            <NavItem to="/authors">
                Authors
            </NavItem>
            <NavItem to="/books">
                Books
            </NavItem>
            <NavItem to="/add-author">
                Add Author
            </NavItem>
            <NavItem to="/add-book">
                Add Books
            </NavItem>
        </Navbar>
    );
};

export default Nav;

// tests/AddBookFormDisplay.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../store/slices/booksSlice';
import authorsReducer from '../store/slices/authorsSlice';
import AddBookForm from './AddBookForm';
import { MemoryRouter } from 'react-router-dom';

describe('AddBookForm Display', () => {
    it('should display all input fields and a submit button', () => {
        // Setup a Redux store with necessary reducers, assuming the form might need it
        const store = configureStore({
            reducer: {
                books: booksReducer,
                authors: authorsReducer,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddBookForm />
                </MemoryRouter>
            </Provider>
        );

        // Check for the book title input field by its label
        expect(screen.getByLabelText(/book title/i)).toBeInTheDocument();

        // Check for the author selection dropdown
        expect(screen.getByLabelText(/author/i)).toBeInTheDocument();

        // Check for the submit button
        expect(screen.getByRole('button', { name: /add book/i })).toBeInTheDocument();
    });
});

// tests/EditBookForm.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../store/slices/booksSlice';
import authorsReducer from '../store/slices/authorsSlice';
import EditBookForm from './EditBookForm';

describe('EditBookForm Display', () => {
    it('should display all input fields and a submit button', () => {
        const store = configureStore({
            reducer: {
                books: booksReducer,
                authors: authorsReducer,
            },
            preloadedState: {
                books: {
                    books: [{ id: '1', title: 'Sample Book', authorId: '1' }],
                },
                authors: {
                    authors: [{ id: '1', name: 'John Doe' }],
                },
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit/1']}>
                    <EditBookForm />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/book title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /update book/i })).toBeInTheDocument();
    });
});

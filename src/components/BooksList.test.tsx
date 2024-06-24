// tests/BooksList.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import booksReducer, { BookState } from '../store/slices/booksSlice';
import authorsReducer, { AuthorState } from '../store/slices/authorsSlice';
import BooksList from '../components/BooksList';
import { RootState } from '../store';
import { MemoryRouter } from 'react-router-dom';
import AuthorList from "./AuthorList.tsx";

describe('BooksList', () => {
    const initialState: RootState = {
        books: {
            books: [
                { id: '1', title: 'Book One', authorId: '1' },
                { id: '2', title: 'Book Two', authorId: '2' }
            ],
        },
        authors: {
            authors: [
                { id: '1', name: 'John Doe', age: 30, gender: 'male' },
                { id: '2', name: 'Jane Doe', age: 25, gender: 'female' }
            ],
        },
    };

    const store: EnhancedStore = configureStore({
        reducer: {
            books: booksReducer,
            authors: authorsReducer,
        },
        preloadedState: initialState,
    });

    it('should render a list of books', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <BooksList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Book One by John Doe')).toBeInTheDocument();
        expect(screen.getByText('Book Two by Jane Doe')).toBeInTheDocument();
    });

    it('should show a message when no books are available', () => {
        const emptyState: RootState = { books: { books: [] } };
        const emptyStore: EnhancedStore = configureStore({
            reducer: {
                authors: authorsReducer,
            },
            preloadedState: emptyState,
        });

        render(
            <Provider store={emptyStore}>
                <MemoryRouter>
                    <BooksList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText('No books available')).toBeInTheDocument();
    });
});

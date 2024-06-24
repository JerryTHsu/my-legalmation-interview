// tests/AuthorsList.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import authorsReducer, { AuthorState } from '../store/slices/authorsSlice';
import AuthorList from '../components/AuthorList';
import { RootState } from '../store';
import { MemoryRouter } from 'react-router-dom';

describe('AuthorsList', () => {
    const initialState: RootState = {
        authors: {
            authors: [
                { id: '1', name: 'John Doe', age: 30, gender: 'male' },
                { id: '2', name: 'Jane Doe', age: 25, gender: 'female' }
            ],
        },
    };

    const store: EnhancedStore = configureStore({
        reducer: {
            authors: authorsReducer,
        },
        preloadedState: initialState,
    });

    it('should render a list of authors', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AuthorList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('John Doe - male - 30 years old')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe - female - 25 years old')).toBeInTheDocument();
    });

    it('should show a message when no authors are available', () => {
        const emptyState: RootState = { authors: { authors: [] } };
        const emptyStore: EnhancedStore = configureStore({
            reducer: {
                authors: authorsReducer,
            },
            preloadedState: emptyState,
        });

        render(
            <Provider store={emptyStore}>
                <MemoryRouter>
                    <AuthorList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText('No authors available')).toBeInTheDocument();
    });
});

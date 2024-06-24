// tests/EditAuthorFormDisplay.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from '../store/slices/authorsSlice';
import EditAuthorForm from './EditAuthorForm';

describe('EditAuthorForm Display', () => {
    it('should display all input fields and a submit button', () => {
        const store = configureStore({
            reducer: {
                authors: authorsReducer,
            },
            preloadedState: {
                authors: {
                    authors: [{ id: '1', name: 'John Doe', age: 30, gender: 'male' }],
                },
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit/1']}>
                    <EditAuthorForm />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/photo url/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /update author/i })).toBeInTheDocument();
    });
});

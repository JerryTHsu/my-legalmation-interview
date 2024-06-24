// tests/AddAuthorFormDisplay.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from '../store/slices/authorsSlice';
import AddAuthorForm from './AddAuthorForm';

describe('AddAuthorForm Display', () => {
    it('should display all input fields and a submit button', () => {
        const store = configureStore({
            reducer: {
                authors: authorsReducer,
            },
        });

        render(
            <Provider store={store}>
                <AddAuthorForm />
            </Provider>
        );

        // Check for input fields by their label
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/photo url/i)).toBeInTheDocument();

        // Check for the submit button
        expect(screen.getByRole('button', { name: /add author/i })).toBeInTheDocument();
    });
});

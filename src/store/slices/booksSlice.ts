// src/store/booksSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the book type
interface Book {
    id: string;         // Unique identifier for each book
    title: string;      // Title of the book
    authorId: string;   // The ID of the author who wrote the book
}

// Define the state structure for books
interface BooksState {
    books: Book[];
    loading: boolean;   // Tracks the loading state for asynchronous operations
    error: string | null; // Error message if an API call fails
}

// Initial state for the books slice
const initialState: BooksState = {
    books: [],
    loading: false,
    error: null,
};

// Thunk to fetch books from the backend
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get('/api/books');
    return response.data;
});

// Thunk to add a new book
export const addBook = createAsyncThunk('books/addBook', async (book: Omit<Book, 'id'>) => {
    const response = await axios.post('/api/books', book);
    return response.data;
});

// Thunk to edit an existing book
export const editBook = createAsyncThunk('books/editBook', async (book: Book) => {
    const response = await axios.put(`/api/books/${book.id}`, book);
    return response.data;
});

// Thunk to delete a book
export const deleteBook = createAsyncThunk('books/deleteBook', async (id: string) => {
    await axios.delete(`/api/books/${id}`);
    return id;
});

// Create the books slice
const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        // Reducers for synchronous actions can be added here
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch books';
                state.loading = false;
            })
            .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.books.push(action.payload.book);
            })
            .addCase(editBook.fulfilled, (state, action: PayloadAction<Book>) => {
                const index = state.books.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
            })
            .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
                state.books = state.books.filter(book => book.id !== action.payload);
            });
    },
});

export default booksSlice.reducer;

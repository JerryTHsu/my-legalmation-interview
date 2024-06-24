// src/store/slices/authorsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
    const response = await axios.get('/api/authors');
    return response.data.authors;
});

export const fetchAuthorDetails = createAsyncThunk('authors/fetchDetails', async (id: string) => {
    const response = await axios.get(`/api/authors/${id}`);
    console.log(response.data.author);
    return response.data.author;
});

export const addAuthor = createAsyncThunk('authors/addAuthor', async (newAuthor) => {
    const response = await axios.post('/api/authors', newAuthor);
    return response.data;
});

export const deleteAuthor = createAsyncThunk('authors/deleteAuthor', async (id: number) => {
    const response = await axios.delete(`/api/authors/${id}`);
    return response.data;
});

export const updateAuthor = createAsyncThunk('authors/updateAuthor', async (author) => {
    const response = await axios.put(`/api/authors/${author.id}`, author);
    return response.data;
});

const authorsSlice = createSlice({
    name: 'authors',
    initialState: { authors: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addAuthor.fulfilled, (state, action) => {
                state.authors.push(action.payload.author);
            })
            .addCase(deleteAuthor.fulfilled, (state, action) => {
                state.authors = state.authors.filter((author) => author.id !== action.payload);
            })
            .addCase(updateAuthor.fulfilled, (state, action) => {
                const index = state.authors.findIndex((author) => author.id === action.payload.id);
                if (index !== -1) {
                    state.authors[index] = action.payload;
                }
            });
    },
});

export default authorsSlice.reducer;

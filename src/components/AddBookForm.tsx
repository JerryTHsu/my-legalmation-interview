import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addBook, fetchBooks} from '../store/slices/booksSlice';
import { fetchAuthors } from '../store/slices/authorsSlice';
import { RootState } from '../store';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const AddBookForm: React.FC = () => {
    const dispatch = useDispatch();
    const authors = useSelector((state: RootState) => state.authors.authors);
    const books = useSelector((state: RootState) => state.books.books)
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchAuthors());
    }, [dispatch]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || !authorId) {
            alert('Please fill in all fields.');
            return;
        }
        dispatch(addBook({ title, authorId }));
        alert('Book Added Successfully!');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label>
                Book Title:
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title"
                />
            </label>
            <label>
                Author:
                <Select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                >
                    <option value="" disabled>Select an author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </Select>
            </label>
            <Button type="submit">Add Book</Button>
        </Form>
    );
};

export default AddBookForm;

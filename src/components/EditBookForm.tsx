import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editBook, fetchBooks } from '../store/slices/booksSlice';
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

const EditBookForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const book = useSelector((state: RootState) => state.books.books.find(b => b.id === id));
    const authors = useSelector((state: RootState) => state.authors.authors);
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        if (!book) {
            dispatch(fetchBooks(id));
        } else {
            setTitle(book.title);
            setAuthorId(book.authorId);
        }
        if (authors.length === 0) {
            dispatch(fetchAuthors());
        }
    }, [dispatch, id, book, authors.length]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || !authorId) {
            alert('Please fill in all fields.');
            return;
        }
        dispatch(editBook({ id, title, authorId }));
        navigate('/books'); // Navigate back to the books list
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label>
                Book Title:
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Author:
                <Select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                >
                    <option value="">Select an author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </Select>
            </label>
            <Button type="submit">Update Book</Button>
        </Form>
    );
};

export default EditBookForm;

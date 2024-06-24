// src/components/BooksList.tsx
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {fetchBooks, deleteBook } from '../store/slices/booksSlice';
import {fetchAuthors} from "../store/slices/authorsSlice";
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the list
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 1em 0;
  padding: 0.5em;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
`;

const Button = styled.button`
  margin-left: 10px;
  background-color: #ff4747;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff2121;
  }
`;

const BooksList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state: RootState) => state.books);
    const authors = useSelector((state: RootState) => state.authors);
    const [titleFilter, setTitleFilter] = useState('');

    const filteredBooks = books? books.books.filter(book => {
        return book.title.toLowerCase().includes(titleFilter.toLowerCase());
    }):[];

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            dispatch(deleteBook(id));
        }
    };

    const getAuthorName = (authorId: string) => {
        const author = authors.authors.find(author => author.id === authorId);
        return author ? author.name : 'Unknown Author';
    };

    const handleEdit = (id: string) => {
      navigate(`/books/${id}`);
    }

    // Fetch authors when component mounts
    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchAuthors());
    }, [dispatch]);

    return (
        <>
            <Input
                type="text"
                value={titleFilter}
                onChange={e => setTitleFilter(e.target.value)}
                placeholder="Filter by title..."
            />
            <List>
                {books && books.books && filteredBooks?
                    filteredBooks.map((book) => (
                        <ListItem key={book.id}>
                            <span>
                                {book.title} by {getAuthorName(book.authorId)}
                            </span>
                            <div>
                                <Button onClick={() => handleEdit(book.id)} style={{ backgroundColor: '#007bff' }}>Edit</Button>
                                <Button onClick={() => handleDelete(book.id)}>Delete</Button>
                            </div>
                        </ListItem>
                    )):(
                        <ListItem>
                            No books available
                        </ListItem>
                    )
                }
            </List>
        </>
    );
};

export default BooksList;

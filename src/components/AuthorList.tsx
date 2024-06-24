import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {deleteAuthor, fetchAuthors} from '../store/slices/authorsSlice';
import styled from 'styled-components';

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #ee5253;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff6b6b;
  }
`;

const AuthorsList: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authors = useSelector((state) => state.authors.authors);
    const [nameFilter, setNameFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState('');
    const [ageTypeFilter, setAgeTypeFilter] = useState('');

    // Fetch authors when component mounts
    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    //todo: add filter test to vitest...
    const filteredAuthors = authors.filter(author => {
        return (author.gender === genderFilter || genderFilter === '')
            && (author.name.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter === '')
            && (ageTypeFilter === '' ||
                (
                    (ageTypeFilter === 'exact' && author.age == ageFilter)
                    || (ageTypeFilter === 'greater' && author.age > ageFilter)
                    || (ageTypeFilter === 'less' && author.age < ageFilter)
                )
            );
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            dispatch(deleteAuthor(id));
            dispatch(fetchAuthors());
        }
    };

    const handleEdit = (id) => {
        navigate(`/authors/${id}`);
    };

    return (
        <>
            <Input
                type="text"
                value={nameFilter}
                onChange={e => setNameFilter(e.target.value)}
                placeholder="Filter by name..."
            />
            <Select
                value={genderFilter}
                onChange={e => setGenderFilter(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
            </Select>
            <Input
                type="number"
                value={ageFilter}
                onChange={e => setAgeFilter(e.target.value)}
                placeholder="Filter by age..."
            />
            <Select
                value={ageTypeFilter}
                onChange={e => setAgeTypeFilter(e.target.value)}
            >
                <option value="">Select Age Filter Type</option>
                <option value="exact">Exact</option>
                <option value="greater">Greater than</option>
                <option value="less">Less than</option>
            </Select>
            <List>
                {filteredAuthors.length > 0 ? (
                    filteredAuthors.map((author) => (
                    <ListItem key={author.id}>
                    <span>
                        <img src={author.profilePicture} alt={author.name} width="50"/>
                        <span>{author.name} - {author.gender} - {author.age} years old</span>
                    </span>
                        <div>
                            <Button onClick={() => handleEdit(author.id)}>Edit</Button>
                            <Button onClick={() => handleDelete(author.id)}>Delete</Button>
                        </div>
                    </ListItem>
                    ))):(
                        <ListItem>No authors available</ListItem>
                    )
                }
            </List>
        </>
    );
};

export default AuthorsList;

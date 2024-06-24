import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { fetchAuthors, updateAuthor } from '../store/slices/authorsSlice';
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

const EditAuthorForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const author = useSelector((state: RootState) => state.authors.authors.find(a => a.id === id));

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        if (!author) {
            dispatch(fetchAuthors());
        } else {
            setName(author.name || '');
            setAge(author.age.toString());
            setPhoto(author.profilePicture || '');
            setGender(author.gender || '');
        }
    }, [author, dispatch, id]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !age || !photo || !gender) {
            alert('Please fill in all fields.');
            return;
        }
        dispatch(updateAuthor({ id, name, age: parseInt(age, 10), profilePicture:photo, gender }));
        navigate('/authors'); // Navigate back to the authors list
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label>
                Name:
                <Input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Age:
                <Input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
            </label>
            <label>
                Photo URL:
                <Input
                    type="text"
                    value={photo}
                    onChange={e => setPhoto(e.target.value)}
                />
            </label>
            <label>
                Gender:
                <Select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                </Select>
            </label>
            <Button type="submit">Update Author</Button>
        </Form>
    );
};

export default EditAuthorForm;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthor } from '../store/slices/authorsSlice';
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

const AddAuthorForm: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState('https://randomuser.me/api/portraits/men/56.jpg');
    const [gender, setGender] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !age || !photo || !gender) {
            alert('Please fill in all fields.');
            return;
        }

        dispatch(addAuthor({
            name,
            age: parseInt(age),
            profilePicture:photo,
            gender
        }));
        setName('');
        setAge('');
        setPhoto('https://randomuser.me/api/portraits/men/56.jpg');
        setGender('');
        alert('Author Added Successfully!');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label>
                Name:
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter author name"
                />
            </label>
            <label>
                Age:
                <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter author age"
                />
            </label>
            <label>
                Photo URL:
                <Input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="Enter photo URL"
                />
            </label>
            <label>
                Gender:
                <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                </Select>
            </label>
            <Button type="submit">Add Author</Button>
        </Form>
    );
};

export default AddAuthorForm;

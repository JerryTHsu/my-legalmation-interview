// src/mirage/scenarios.ts
import { Server } from 'miragejs';

export function setupScenarios(server: Server) {
    // Create authors
    const authorsData = [
        { id: 1, name: 'Author 1', gender: 'male', age: 20, profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Author 2', gender: 'male', age: 43, profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 3, name: 'Author 3', gender: 'male', age: 52, profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Author 4', gender: 'male', age: 30, profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 5, name: 'Author 5', gender: 'male', age: 25, profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { id: 6, name: 'Author 6', gender: 'female', age: 33, profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { id: 7, name: 'Author 7', gender: 'female', age: 44, profilePicture: 'https://randomuser.me/api/portraits/women/7.jpg' },
        { id: 8, name: 'Author 8', gender: 'female', age: 24, profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { id: 9, name: 'Author 9', gender: 'female', age: 39, profilePicture: 'https://randomuser.me/api/portraits/women/9.jpg' },
        { id: 10, name: 'Author 10', gender: 'female', age: 40, profilePicture: 'https://randomuser.me/api/portraits/women/10.jpg' },
        { id: 11, name: 'Author 11', gender: 'male', age: 37, profilePicture: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { id: 12, name: 'Author 12', gender: 'male', age: 28, profilePicture: 'https://randomuser.me/api/portraits/men/12.jpg' },
        { id: 13, name: 'Author 13', gender: 'female', age: 55, profilePicture: 'https://randomuser.me/api/portraits/women/13.jpg' },
        { id: 14, name: 'Author 14', gender: 'female', age: 34, profilePicture: 'https://randomuser.me/api/portraits/women/14.jpg' },
        { id: 15, name: 'Author 15', gender: 'male', age: 38, profilePicture: 'https://randomuser.me/api/portraits/men/15.jpg' },
        { id: 16, name: 'Author 16', gender: 'female', age: 60, profilePicture: 'https://randomuser.me/api/portraits/women/16.jpg' },
        { id: 17, name: 'Author 17', gender: 'male', age: 62, profilePicture: 'https://randomuser.me/api/portraits/men/17.jpg' },
        { id: 18, name: 'Author 18', gender: 'female', age: 41, profilePicture: 'https://randomuser.me/api/portraits/women/18.jpg' },
        { id: 19, name: 'Author 19', gender: 'male', age: 46, profilePicture: 'https://randomuser.me/api/portraits/men/19.jpg' },
        { id: 20, name: 'Author 20', gender: 'female', age: 28, profilePicture: 'https://randomuser.me/api/portraits/women/20.jpg' },
    ];

    // Create authors and store them in an array
    const authors = authorsData.map(author => server.create('author', author));

    // Create books for each author
    let bookId = 1;
    authors.forEach(author => {
        if (author.id <= 2) {
            // Authors with no books
            return; // Skip creating books for these authors
        } else if (author.id <= 7) {
            // Prolific authors with at least 50 books each
            for (let j = 1; j <= 50; j++) {
                server.create('book', { id: bookId++, title: `Book ${j} by ${author.name}`, author });
            }
        } else {
            // Authors with some books
            for (let j = 1; j <= 10; j++) {
                server.create('book', { id: bookId++, title: `Book ${j} by ${author.name}`, author });
            }
        }
    });
}

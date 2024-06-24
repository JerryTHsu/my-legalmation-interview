// src/mirage/server.ts
import { Server, Model, Factory, Response } from 'miragejs';
import { User } from './types'; // Import User type

// Define arrays of first names and last names
const maleFirstNames = ['John', 'Alex', 'Chris', 'Michael', 'David'];
const femaleFirstNames = ['Jane', 'Emily', 'Katie', 'Laura', 'Sarah'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown'];

// Set to keep track of used photo numbers
const usedPhotoNumbers: Set<number> = new Set();

// Function to generate unique random integers
const generateUniqueRandomNumber = (max: number): number => {
    let randomNumber = Math.floor(Math.random() * max);
    while (usedPhotoNumbers.has(randomNumber)) {
        randomNumber = Math.floor(Math.random() * max);
    }
    usedPhotoNumbers.add(randomNumber);
    return randomNumber;
};

export function makeServer({ environment = 'development' } = {}) {

    let gender = "men";

    return new Server({
        environment,

        // Define MirageJS models
        models: {
            user: Model.extend<Partial<User>>({}),
        },

        // Define factories for generating mock data
        factories: {
            user: Factory.extend({
                name() {
                    const firstName = gender === 'men'
                        ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
                        : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
                    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                    return `${firstName} ${lastName}`;
                },
                age() {
                    return Math.floor(Math.random() * 30) + 20;
                },
                profilePhoto() {
                    gender = Math.random() > 0.5 ? 'men' : 'women';
                    const maxPhotos = 100;
                    let photoNumber = generateUniqueRandomNumber(maxPhotos);
                    return `https://randomuser.me/api/portraits/${gender}/${photoNumber}.jpg`;
                },
            }),
        },

        // Seed the database with initial data
        seeds(server) {
            server.createList('user', 10); // Create 10 users
        },

        // Define routes for the API
        routes() {
            this.namespace = 'api'; // Prefix all routes with /api

            this.get('/users', (schema, request) => {
                return schema.users.all(); // Return all users
            });

            this.post('/users', (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.users.create(attrs); // Create a new user
            });

            this.get('/users/:id', (schema, request) => {
                let id = request.params.id;
                return schema.users.find(id); // Return a specific user by ID
            });

            this.put('/users/:id', (schema, request) => {
                let id = request.params.id;
                let attrs = JSON.parse(request.requestBody);
                let user = schema.users.find(id);

                return user.update(attrs); // Update a specific user by ID
            });

            this.delete('/users/:id', (schema, request) => {
                let id = request.params.id;
                return schema.users.find(id)?.destroy(); // Delete a specific user by ID
            });
        },
    });
}

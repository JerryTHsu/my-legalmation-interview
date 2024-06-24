// src/mirage/models/author.ts
import { Model, hasMany } from 'miragejs';

export default Model.extend({
    name: 'test', // Define attributes of Author
    books: hasMany(), // Define a one-to-many relationship: Author has many Books
});

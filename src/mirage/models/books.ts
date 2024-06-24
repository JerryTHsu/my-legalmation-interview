// src/mirage/models/book.ts
import { Model, belongsTo } from 'miragejs';

export default Model.extend({
    title: '', // Define attributes of Book
    page: 100, // Define attribute for number of pages
    author: belongsTo(), // Define a many-to-one relationship: Book belongs to an Author
});

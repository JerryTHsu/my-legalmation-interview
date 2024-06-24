// src/mirage/config.ts
import { Server, Model, Factory, belongsTo, hasMany, RestSerializer } from 'miragejs';

import { setupScenarios } from './scenarios';

export function makeServer({ environment = 'development' } = {}): Server {
    return new Server({
        environment,

        // todo: future scenario to consider, what if there are multiple authors for a book?
        models: {
            author: Model.extend({
                books: hasMany('book'),
            }),
            book: Model.extend({
                author: belongsTo('author'),
            }),
        },

        factories: {
            author: Factory.extend({
                name(i) {
                    return `Author ${i + 1}`;
                },
            }),
            book: Factory.extend({
                title(i) {
                    return `Book ${i + 1}`;
                },
                // If necessary, ensure the author is associated during creation
                afterCreate(book, server) {
                    if (!book.authorId) {
                        const author = server.create('author');
                        book.update({ author });
                    }
                }
            }),
        },

        serializers: {
            author: RestSerializer.extend({
                include: ["books"],
                embed: true,
            }),
            book: RestSerializer.extend({
                include: ["author"],
                embed: true,
            })
        },

        routes() {
            this.namespace = 'api';

            this.get('/authors', (schema) => {
                return schema.authors.all();
            });

            this.get('/authors/:id', (schema, request) => {
                let id = request.params.id;
                return schema.authors.find(id);
            });

            this.put('/authors/:id', (schema, request) => {
                let id = request.params.id;
                let attrs = JSON.parse(request.requestBody);
                return schema.authors.find(id).update(attrs);
            });

            this.get('/books', (schema) => {
                return schema.books.all().models.map(book => ({
                    ...book.attrs,
                    author: book.author.attrs,
                }));
            });

            this.get('/books/:id', (schema, request) => {
                let id = request.params.id;
                let book = schema.books.find(id);
                return {
                    book: {
                        ...book.attrs,
                        author: book.author.attrs,
                    }
                };
            });

            this.put('/books/:id', (schema, request) => {
                let id = request.params.id;
                let attrs = JSON.parse(request.requestBody);
                return schema.books.find(id).update(attrs);
            });

            this.post('/authors', (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.authors.create(attrs); // Endpoint to create a new author
            });

            this.post('/books', (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.books.create(attrs); // Endpoint to create a new book
            });

            // DELETE route for deleting an author
            this.delete('/authors/:id', (schema, request) => {
                let id = request.params.id;
                let author = schema.authors.find(id);

                if (author) {
                    author.destroy();
                    return new Response(204, {}, 'Author deleted');
                } else {
                    return new Response(404, {}, { errors: ['Author not found'] });
                }
            });

            // DELETE route for deleting a book
            this.delete('/books/:id', (schema, request) => {
                let id = request.params.id;
                let book = schema.books.find(id);

                if (book) {
                    book.destroy();
                    return new Response(204, {}, 'Book deleted');
                } else {
                    return new Response(404, {}, { errors: ['Book not found'] });
                }
            });

        },

        seeds(server) {
            setupScenarios(server); //seed scenarios into database
        },
    });
}

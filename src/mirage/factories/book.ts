// src/mirage/factories/book.ts
import { Factory } from 'miragejs';

const bookFactory = Factory.extend({
    title: (i: number) => `Book ${i + 1}`, // Generates titles like "Book 1", "Book 2", etc.
    pages: () => {
        let pages:number = Math.floor(Math.random() * 1000);
        while (pages !> 100) {
            pages = Math.floor(Math.random() * 1000);
        }
        return pages;
    },
    authorId: () => Math.floor(Math.random() * 20)+1,
});

export default bookFactory;

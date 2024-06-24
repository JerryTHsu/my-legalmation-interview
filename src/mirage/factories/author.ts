// src/mirage/factories/author.ts
import { Factory } from 'miragejs';

// Note: Problem with Setting the factory this way is that you will always have the fields randomize everytime you refresh a page.

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

let gender = "men";

const authorFactory = Factory.extend({
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
});

export default authorFactory;

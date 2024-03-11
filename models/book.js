import { Schema, model } from 'mongoose';
import { z } from 'zod';

const BookSchema = z.object({
    title: z.string(),
    authors: z.array(z.string()),
    genre: z.string(),
    isbn: z.string(),
    publicationYear: z.number(),
    publisher: z.string(),
    synopsis: z.string(),
    quantityInStock: z.number(),
});

const BookMongoSchema = new Schema({
    title: String,
    authors: [String],
    genre: String,
    isbn: String,
    publicationYear: Number,
    publisher: String,
    synopsis: String,
    quantityInStock: Number,
});

const Book = model('Book', BookMongoSchema);

export { Book, BookSchema };
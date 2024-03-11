import { Book, BookSchema } from '../models/book.js';

const controllerBook = {
    createBook: async (req, res) => {
        try {
            const { title, authors, genre, isbn, publicationYear, publisher, synopsis, quantityInStock } = req.body;

            const validatedBookData = BookSchema.parse({
                title, authors, genre, isbn, publicationYear, publisher, synopsis, quantityInStock
            });

            const newBook = new Book(validatedBookData);

            await newBook.save();

            res.status(200).json({ msg: 'Livro cadastrado com sucesso', data: newBook });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }
    },
    listBooks: async (req, res) => {
        try {
            const books = await Book.find();

            res.status(200).json({ msg: 'Livros obtidos com sucesso', data: books });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }
    },
    getOneBook: async (req, res) => {
        try {
            const { id } = req.params;

            const book = await Book.findById(id);

            if (!book) {
                return res.status(404).json({ msg: 'Livro não encontrado' });
            }

            res.status(200).json({ msg: 'Livro obtido com sucesso', data: book });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }
    },
    updateBook: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, authors, genre, isbn, publicationYear, publisher, synopsis, quantityInStock } = req.body;

            const validatedBookData = BookSchema.parse({
                title,
                authors,
                genre,
                isbn,
                publicationYear,
                publisher,
                synopsis,
                quantityInStock
            });

            const updatedBook = await Book.findByIdAndUpdate(id, validatedBookData, { new: true });

            if (!updatedBook) {
                return res.status(404).json({ msg: 'Livro não encontrado ou erro ao atualizar' });
            }

            res.status(200).json({ msg: 'Livro atualizado com sucesso', data: updatedBook });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }

    },
    deleteBook: async (req, res) => {
        try {
            const { id } = req.params;

            await Book.findByIdAndDelete(id);

            res.status(200).json({ msg: 'Livro deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }
    },
}


export { controllerBook };

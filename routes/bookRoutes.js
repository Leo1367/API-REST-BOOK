import { Router } from "express";
import { controllerBook } from "../controllers/bookControllers.js";

const router = Router();

router.post('/create-book', controllerBook.createBook)
router.get('/list-book', controllerBook.listBooks)
router.get('/:id', controllerBook.getOneBook)
router.put('/:id', controllerBook.updateBook)
router.delete('/:id', controllerBook.deleteBook)

export default router;
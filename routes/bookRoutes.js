import { Router } from "express";
import { controllerBook } from "../controllers/bookControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post('/create-book', verifyToken, controllerBook.createBook)
router.get('/list-book', verifyToken, controllerBook.listBooks)
router.get('/:id', verifyToken, controllerBook.getOneBook)
router.put('/:id', verifyToken, controllerBook.updateBook)
router.delete('/:id', verifyToken, controllerBook.deleteBook)

export default router;
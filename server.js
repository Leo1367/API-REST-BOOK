import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import conectDB from './config/db.js';
import bookRouter from './routes/bookRoutes.js'
import userRouter from './routes/userRoutes.js'

config()
conectDB()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/book', bookRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
})
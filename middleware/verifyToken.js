import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config()

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export { verifyToken };
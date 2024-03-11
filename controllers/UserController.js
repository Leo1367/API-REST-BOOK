import User from '../models/user.js';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

config();

const userControllers = {
    register: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;

        try {
            if (!name || !email || !password) {
                return res.status(422).json({ msg: "Nome, email e senha são obrigatórios" });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(422).json({ msg: "Formato de e-mail inválido" });
            }

            if (password !== confirmPassword) {
                return res.status(422).json({ msg: "Senhas não coincidem" });
            }

            const userExists = await User.findOne({ email: email });

            if (userExists) {
                return res.status(422).json({ msg: "E-mail já cadastrado" });
            }

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = new User({
                name,
                email,
                password: passwordHash,
            });

            await user.save();

            res.status(201).json({ msg: 'Usuário criado com sucesso!', data: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                return res.status(422).json({ msg: "Email e senha são obrigatórios" });
            }

            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(422).json({ msg: "Senha incorreta" });
            }

            const secret = process.env.SECRET;

            const token = jwt.sign({ id: user._id }, secret);

            res.status(200).json({ msg: "Autenticação realizada com sucesso", data: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }
    },
    user: async (req, res) => {
        try {
            const id = req.params.id;

            const user = await User.findById(id, '-password');

            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado" });
            }

            res.status(200).json({ msg: user })
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde', error: error });
        }
    }
}

export { userControllers };
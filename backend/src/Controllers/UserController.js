const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../Models/index')
const dotenv = require('dotenv').config();
const User = db.User;

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const FindUser = await User.findOne({ email: email });
    if (FindUser) {
        return res.status(500).send('Bu Email Adresi ile zaten bir hesap oluşturulmuş. Lütfen Giriş Yapınız.');
    }
    if (password.length < 6) {
        return res.status(500).send('Şifreniz en az 6 karakter olmalıdır.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1d' });
    res.status(201).send({ status: "success", token: token, user: user });
};


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(500).send('Bu Email Adresi ile bir hesap bulunamadı. Lütfen Kayıt Olunuz.');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(500).send('Şifreniz yanlış. Lütfen Tekrar Deneyiniz.');
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1d' });
    res.status(200).send({ status: "success", token: token, user: user });
};

module.exports = {
    register,
    login
};

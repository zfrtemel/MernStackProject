const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config();
const User = require('../Models/index').User;
const Goal = require('../Models/index').Goal;

const CreateGoal = async (req, res) => {
    const { head, desc, deadline, status } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.status(500).send('Hatalı Token');
        }
        return user.id;
    });
    const FindGoal = await Goal.findOne({ head: head }, { desc: desc });
    if (FindGoal) {
        return res.status(500).send('Bu Başlık ile zaten bir hedef oluşturulmuş. Lütfen Başka Bir Başlık Giriniz.');
    }
    if (user == null)
        return res.status(500).send('Hedef Oluşturmak için Giriş Yapınız.');

    const goal = await Goal.create({
        user: user,
        head: head,
        desc: desc,
        deadline: deadline,
        status: status,
    });
    res.status(201).send({ status: "success", goal: goal });
};

const GetUserGoals = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.status(500).send('Hatalı Token');
        }
        return user.id;
    });

    if (user == null)
        return res.status(500).send('Hedefleri Listelemek için Giriş Yapınız.');
    const Goals = await Goal.find({ user: user });

    res.status(200).send({ status: "success", data: [Goals] });
}
const UpdateGoal = async (req, res) => {
    const { title, description, deadline, status } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.status(500).send('Hatalı Token');
        }
        return user.id;
    });
    const goal = await Goal.findOne({ title: title }, { description: description });

    if (goal == null)
        return res.status(500).send('Bu Başlık ile bir hedef bulunamadı.');
    if (user == null)
        return res.status(500).send('Hedef Güncellemek için Giriş Yapınız.');
    if (goal.user != user)
        return res.status(500).send('Bu Hedefi Güncellemek için Yetkiniz Yok.');

    const UpdatedGoal = await Goal.update({
        title: title,
        description: description,
        deadline: new Date(deadline).toISOString(),
        status: status,
    }, { title: title }, { description: description });
    res.status(200).send({ status: "success", goal: UpdatedGoal });
}
const DeleteGoal = async (req, res) => {
    const { title, description } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.status(500).send('Hatalı Token');
        }
        return user.id;
    });
    const goal = await Goal.findOne({ title: title }, { description: description });

    if (goal == null)
        return res.status(500).send('Bu Başlık ile bir hedef bulunamadı.');
    if (user == null)
        return res.status(500).send('Hedef Silmek için Giriş Yapınız.');
    if (goal.user != user)
        return res.status(500).send('Bu Hedefi Silmek için Yetkiniz Yok.');

    const DeletedGoal = await Goal.destroy({ _id: _id });
    res.status(200).send({ status: "success", goal: DeletedGoal });
}

module.exports = {
    CreateGoal,
    GetUserGoals,
    UpdateGoal,
    DeleteGoal
}

//crud olacak
